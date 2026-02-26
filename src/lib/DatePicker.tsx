import React, { useEffect, useId, useMemo, useState, type ReactNode } from 'react';
import ReactDOM from 'react-dom';

import { Calendar } from './Calendar';
import { libClassName, calendarAriaLabel } from './helpers/configuration';
import parentHasClass from './helpers/parentHasClass';
import useRepositionOnViewportChange from './helpers/useRepositionOnViewportChange';
import { mergeRefs } from './helpers/utils';
import type { DatePickerProps, ReactCalendarDate } from './types';

export const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
    function DatePicker(props, ref) {
        const defaults = {
            visibleMonths: 1,
            displayDayTitles: true,
            displayMonthPicker: true,
            displayYearPicker: true
        } as const;
        const _props = { ...defaults, ...props };
        const {
            displayCalendar,
            calendarRef,
            inputRef,
            close,
            selectedDate,
            setSelectedDate,
            typedValue,
            getStyle,
            onChange,
            onFocus,
            onBlur,
            onClick,
            onKeyDown,
            setTypedValue,
            calendarDateToValue
        } = useDatePicker(props);

        const inputId = useId();
        const calendarId = useId();

        let calendar: ReactNode | null = null;
        // Allow opening the calendar even when the input is readOnly (useful on mobile to avoid the keyboard)
        if (displayCalendar && !_props.disabled) {
            calendar = ReactDOM.createPortal(
                <div role="dialog" aria-modal="true" id={calendarId} aria-label={calendarAriaLabel}>
                    <Calendar
                        isDisabledDay={_props.isDisabledDay}
                        ref={calendarRef}
                        style={getStyle()}
                        className={
                            'is-portal' +
                            (_props.calendarClassName ? ' ' + _props.calendarClassName : '')
                        }
                        containerTabIndex={-1}
                        date={selectedDate}
                        visibleMonths={_props.visibleMonths!}
                        displayDayTitles={!!_props.displayDayTitles}
                        displayMonthPicker={!!_props.displayMonthPicker}
                        displayYearPicker={!!_props.displayYearPicker}
                        onSelect={(date) => {
                            const oldDate = selectedDate ? { ...selectedDate } : undefined;
                            setSelectedDate(date);
                            setTypedValue(calendarDateToValue(date));
                            props.onSelect?.(date, oldDate);
                        }}
                        renderMonthTitle={_props.renderMonthTitle}
                        dateClasses={_props.dateClasses}
                        after={
                            <>
                                <button type="button" onClick={close} className="close-button">
                                    Close
                                </button>
                                {_props.after}
                            </>
                        }
                        afterYearPicker={_props.afterYearPicker}
                        afterMonthPicker={_props.afterMonthPicker}
                    />
                </div>,
                document.getElementsByTagName('body')[0]
            );
        }

        const inputProps: React.InputHTMLAttributes<HTMLInputElement> = {
            role: 'combobox',
            'aria-haspopup': 'dialog',
            'aria-expanded': displayCalendar,
            'aria-controls': calendarId,
            id: inputId,
            ...extractInputIntrinsic(_props),
            className: `${libClassName}-date-picker ${_props.className || ''}`,
            value: typedValue,
            onFocus,
            onChange,
            onBlur,
            onClick,
            onKeyDown
        };

        return (
            <>
                {props.renderInput ? (
                    props.renderInput(inputProps)
                ) : (
                    <input ref={mergeRefs(inputRef, ref)} {...inputProps} />
                )}
                {calendar}
            </>
        );
    }
);

function useDatePicker(props: DatePickerProps) {
    const [displayCalendar, setDisplayCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState<ReactCalendarDate | undefined>(props.date);
    const [typedValue, setTypedValue] = useState<string>('');
    // Trigger re-render to recompute positioning when viewport changes
    useRepositionOnViewportChange(displayCalendar, 300);

    const inputRef = React.useRef<HTMLInputElement>(null);
    const calendarRef = React.useRef<HTMLDivElement>(null);
    // Track last open state to manage focus return
    const wasOpenRef = React.useRef<boolean>(false);
    // Prevent immediate reopen on programmatic focus after close
    const skipOpenOnNextFocusRef = React.useRef<boolean>(false);
    const calendarDateToValue = useMemo(
        () =>
            props.calendarDateToValue ||
            ((date: ReactCalendarDate | undefined) => {
                if (!date) return '';
                const month = date.month.toString().padStart(2, '0');
                const day = date.day.toString().padStart(2, '0');
                return `${date.year}-${month}-${day}`;
            }),
        [props.calendarDateToValue]
    );

    const valueToCalendarDate = useMemo(
        () =>
            props.valueToCalendarDate ||
            ((value: string) => {
                const parts = value.split('-');
                if (parts.length !== 3) return undefined;
                const year = parseInt(parts[0], 10);
                const month = parseInt(parts[1], 10);
                const day = parseInt(parts[2], 10);
                if (
                    isNaN(year) ||
                    isNaN(month) ||
                    isNaN(day) ||
                    month < 1 ||
                    month > 12 ||
                    day < 1
                ) {
                    return undefined;
                }
                // Calculate actual days in the given month/year (handles leap years)
                const daysInMonth = new Date(year, month, 0).getDate();
                if (day > daysInMonth) return undefined;
                return { year, month, day };
            }),
        [props.valueToCalendarDate]
    );

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSelectedDate(props.date);
        if (props.date) {
            setTypedValue(calendarDateToValue(props.date));
        } else {
            setTypedValue('');
        }
    }, [props.date, calendarDateToValue]);

    useEffect(() => {
        if (!displayCalendar) return;

        // Use pointerdown to reliably catch taps/clicks on mobile and desktop
        const onPointerDownOutside = (e: PointerEvent) => {
            const target = e.target as Node;
            const clickedInsideCalendar = !!calendarRef.current?.contains(target);
            const clickedInput = !!inputRef.current?.contains(target);
            if (!clickedInsideCalendar && !clickedInput) {
                if (
                    !props.excludedClasses?.length ||
                    !parentHasClass(e.target as HTMLElement, ...props.excludedClasses)
                ) {
                    setDisplayCalendar(false);
                }
            }
        };

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setDisplayCalendar(false);
        };

        document.addEventListener('pointerdown', onPointerDownOutside);
        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.removeEventListener('pointerdown', onPointerDownOutside);
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [props.excludedClasses, displayCalendar]);

    // Manage focus when opening/closing the calendar for accessibility
    useEffect(() => {
        if (displayCalendar) {
            wasOpenRef.current = true;
            // Defer focus until portal content is mounted
            setTimeout(() => {
                calendarRef.current?.focus();
            }, 0);
        } else if (wasOpenRef.current) {
            // Signal to skip reopening on the next focus event
            skipOpenOnNextFocusRef.current = true;
            // Return focus to the trigger input once the calendar closes and place caret at end
            setTimeout(() => {
                const el = inputRef.current;
                if (el) {
                    el.focus();
                    try {
                        const len = el.value.length;
                        el.setSelectionRange(len, len);
                    } catch {
                        // ignore if input type doesn't support selection range
                    }
                }
            }, 0);
            wasOpenRef.current = false;
        }
    }, [displayCalendar]);

    // Keep focus contained in the calendar while it is open, to avoid losing focus
    // during month navigation or dynamic rerenders inside the calendar.
    useEffect(() => {
        if (!displayCalendar) return;
        const container = calendarRef.current;
        if (!container) return;

        const tryRestoreFocus = () => {
            if (!displayCalendar) return;
            const active = (document.activeElement as HTMLElement | null) ?? null;
            if (!active || !container.contains(active)) {
                // Focus the calendar container (it has a tabindex set via containerTabIndex)
                container.focus();
            }
        };

        const onFocusOut = (e: FocusEvent) => {
            const next = (e.relatedTarget as Node | null) ?? null;
            // If focus stays within the calendar, ignore
            if (next && container.contains(next)) return;
            // Defer to allow any newly mounted nodes to receive focus first
            setTimeout(tryRestoreFocus, 0);
        };

        container.addEventListener('focusout', onFocusOut);
        return () => {
            container.removeEventListener('focusout', onFocusOut);
        };
    }, [displayCalendar]);

    // (moved to useRepositionOnViewportChange)

    return {
        displayCalendar,
        calendarRef,
        inputRef,
        close: () => setDisplayCalendar(false),
        typedValue,
        setTypedValue,
        selectedDate,
        calendarDateToValue,
        setSelectedDate: (date: ReactCalendarDate | undefined) => {
            setDisplayCalendar(false);
            setSelectedDate(date);
        },
        getStyle: () => {
            if (props.getStyle) return props.getStyle(inputRef.current, calendarRef.current);
            const rect = inputRef.current?.getBoundingClientRect();
            if (!rect) return {} as React.CSSProperties;
            const scrollX = window.scrollX || window.pageXOffset;
            const scrollY = window.scrollY || window.pageYOffset;
            const style: React.CSSProperties = {
                left: `${scrollX + rect.left}px`
            };
            if (props.direction && props.direction.toUpperCase() === 'TOP') {
                // Position above the input using bottom offset relative to viewport height
                style.bottom = `${window.innerHeight - (scrollY + rect.top)}px`;
            } else {
                // Default: position below the input
                style.top = `${scrollY + rect.top + rect.height}px`;
            }

            return style;
        },

        onClick: (e: React.MouseEvent<HTMLInputElement>) => {
            if (!displayCalendar) setDisplayCalendar(true);
            setTimeout(() => {
                props.onClick?.(e);
            }, 0);
        },

        onFocus: (e: React.FocusEvent<HTMLInputElement>) => {
            if (skipOpenOnNextFocusRef.current) {
                skipOpenOnNextFocusRef.current = false;
                props.onFocus?.(e);
                return;
            }
            if (displayCalendar) {
                // Keep focus in the calendar when it's open to ensure keyboard nav works there
                calendarRef.current?.focus();
                props.onFocus?.(e);
                return;
            }
            setDisplayCalendar(true);
            props.onFocus?.(e);
        },

        onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
            if (props.closeOnBlur) {
                setDisplayCalendar(false);
            }
            props.onBlur?.(e);
        },

        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            setTypedValue(e.target.value);
            const date = valueToCalendarDate ? valueToCalendarDate(e.target.value) : undefined;
            const oldDate = selectedDate ? { ...selectedDate } : undefined;
            if (date && isValidDate(date)) {
                setSelectedDate(date);
            }
            props.onChange?.(e, date, oldDate);
            return;
        },

        onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (!displayCalendar && e.key === 'ArrowDown') {
                e.preventDefault();
                setDisplayCalendar(true);
                props.onKeyDown?.(e);
                return;
            }
            // When open, we keep focus on the calendar, so no need to redirect nav keys
            props.onKeyDown?.(e);
        }
    };
}

function isValidDate(date: unknown): date is ReactCalendarDate {
    if (typeof date !== 'object' || date === null) return false;
    if (!('year' in date) || typeof date.year !== 'number' || isNaN(date.year)) return false;
    if (!('month' in date) || typeof date.month !== 'number' || isNaN(date.month) || date.month < 1)
        return false;

    const daysInMonth = new Date(date.year, date.month, 0).getDate();
    if (
        !('day' in date) ||
        typeof date.day !== 'number' ||
        isNaN(date.day) ||
        date.day < 1 ||
        date.day > daysInMonth
    )
        return false;
    return true;
}

function extractInputIntrinsic(props: DatePickerProps) {
    const {
        after: _after,
        afterMonthPicker: _afterMonthPicker,
        afterYearPicker: _afterYearPicker,
        calendarClassName: _calendarClassName,
        excludedClasses: _excludedClasses,
        dateClasses: _dateClasses,
        isDisabledDay: _isDisabledDay,
        visibleMonths: _visibleMonths,
        displayDayTitles: _displayDayTitles,
        displayMonthPicker: _displayMonthPicker,
        displayYearPicker: _displayYearPicker,
        renderMonthTitle: _renderMonthTitle,
        date: _date,
        onSelect: _onSelect,
        onChange: _onChange,
        direction: _direction,
        getStyle: _getStyle,
        className: _className,
        ...inputProps
    } = props;

    return inputProps;
}

// (no-op)
