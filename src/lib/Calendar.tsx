import { forwardRef, useCallback, useEffect, useMemo, useState } from 'react';
import type React from 'react';

import { libClassName, firstDay } from './helpers/configuration';
import Month from './Month';
import MonthPicker from './MonthPicker';
import type { CalendarProps, ReactCalendarDate } from './types';
import YearPicker from './YearPicker';

export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
    function CalendarInner(props, ref) {
        const { onSelect, date: controlledDate, defaultDate } = props;

        const initialDate: ReactCalendarDate = useMemo(() => {
            if (controlledDate) return controlledDate;
            if (defaultDate) return defaultDate;
            const now = new Date();
            return {
                year: now.getFullYear(),
                month: now.getMonth() + 1,
                day: now.getDate()
            };
        }, [controlledDate, defaultDate]);

        // Internal selected date state for uncontrolled mode
        const [selectedDateState, setSelectedDateState] = useState<ReactCalendarDate | undefined>(
            defaultDate
        );
        // Displayed (navigated) month/year
        const [displayedDate, setDisplayedDate] = useState<ReactCalendarDate>(initialDate);
        // Focused day for keyboard navigation (roving tabindex)
        const [focusDate, setFocusDate] = useState<ReactCalendarDate>(initialDate);

        // Sync displayed month/year to controlled date ONLY when the controlled date actually changes
        useEffect(() => {
            if (!controlledDate) return;
            setDisplayedDate(controlledDate);
            setFocusDate(controlledDate);
            // We intentionally depend only on the controlled date fields so user navigation doesn't get reset
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [controlledDate?.year, controlledDate?.month, controlledDate?.day]);

        const selectedDate = controlledDate ?? selectedDateState;

        // Stable setter: update internal state in uncontrolled mode; always notify
        const setSelectedAndNotify = useCallback(
            (
                date:
                    | ReactCalendarDate
                    | undefined
                    | ((prev: ReactCalendarDate | undefined) => ReactCalendarDate | undefined)
            ) => {
                if (controlledDate === undefined) {
                    setSelectedDateState((prev) => {
                        const d = typeof date === 'function' ? date(prev) : date;
                        onSelect?.(d);
                        return d;
                    });
                } else {
                    const d = typeof date === 'function' ? date(controlledDate) : date;
                    onSelect?.(d);
                }
            },
            [onSelect, controlledDate]
        );

        // Focus the active day button whenever focusDate changes
        useEffect(() => {
            const key = `${focusDate.year}-${String(focusDate.month).padStart(2, '0')}-${String(
                focusDate.day
            ).padStart(2, '0')}`;
            const btn = document.querySelector(
                `button[data-cal-date="${key}"]`
            ) as HTMLButtonElement | null;
            btn?.focus();
        }, [focusDate, displayedDate.year, displayedDate.month, props.visibleMonths]);

        // Keyboard navigation handler on the calendar container
        const onKeyDown = useCallback(
            (e: React.KeyboardEvent<HTMLDivElement>) => {
                const withShift = e.shiftKey;
                let next: ReactCalendarDate | null = null;
                switch (e.key) {
                    case 'ArrowLeft':
                        next = addDays(focusDate, -1);
                        break;
                    case 'ArrowRight':
                        next = addDays(focusDate, 1);
                        break;
                    case 'ArrowUp':
                        next = addDays(focusDate, -7);
                        break;
                    case 'ArrowDown':
                        next = addDays(focusDate, 7);
                        break;
                    case 'Home': {
                        const d = new Date(focusDate.year, focusDate.month - 1, focusDate.day);
                        const dow = d.getDay();
                        const diff = (dow - firstDay + 7) % 7;
                        next = addDays(focusDate, -diff);
                        break;
                    }
                    case 'End': {
                        const d = new Date(focusDate.year, focusDate.month - 1, focusDate.day);
                        const dow = d.getDay();
                        const diff = 6 - ((dow - firstDay + 7) % 7);
                        next = addDays(focusDate, diff);
                        break;
                    }
                    case 'PageUp':
                        next = withShift ? addYears(focusDate, -1) : addMonths(focusDate, -1);
                        break;
                    case 'PageDown':
                        next = withShift ? addYears(focusDate, 1) : addMonths(focusDate, 1);
                        break;
                    case 'Enter':
                    case ' ': // Space
                        setSelectedAndNotify(focusDate);
                        e.preventDefault();
                        return;
                    default:
                        return;
                }
                if (next) {
                    setFocusDate(next);
                    if (next.year !== displayedDate.year || next.month !== displayedDate.month) {
                        setDisplayedDate({ year: next.year, month: next.month, day: 1 });
                    }
                    e.preventDefault();
                }
            },
            [focusDate, displayedDate.year, displayedDate.month, setSelectedAndNotify]
        );

        return (
            <div
                ref={ref}
                className={`${libClassName} ${props.className || ''}`}
                style={props.style}
                onKeyDown={onKeyDown}
                {...(props.containerTabIndex !== undefined
                    ? { tabIndex: props.containerTabIndex }
                    : {})}
            >
                {props.displayYearPicker !== false && (
                    <YearPicker
                        setDisplayedDate={setDisplayedDate}
                        displayedYear={displayedDate.year}
                    />
                )}

                {props.displayYearPicker !== false && props.afterYearPicker}

                {props.displayMonthPicker !== false && (
                    <MonthPicker
                        displayedDate={displayedDate}
                        setDisplayedDate={setDisplayedDate}
                        renderMonthTitle={props.renderMonthTitle}
                    />
                )}

                {props.displayMonthPicker !== false && props.afterMonthPicker}

                <ul className={`${libClassName}-months`}>
                    {[...Array(props.visibleMonths === undefined ? 1 : props.visibleMonths)].map(
                        (_, i) => {
                            return (
                                <li key={i}>
                                    <Month
                                        isDisabledDay={props.isDisabledDay}
                                        dateClasses={props.dateClasses}
                                        displayMonthTitle={props.displayMonthTitle}
                                        displayDayTitles={props.displayDayTitles}
                                        selectedDate={selectedDate}
                                        displayedDate={displayedDate}
                                        focusDate={focusDate}
                                        setSelectedDate={setSelectedAndNotify}
                                    />
                                </li>
                            );
                        }
                    )}
                </ul>

                {props.after}
            </div>
        );
    }
);

// --- Navigation helpers ---
function addDays(date: ReactCalendarDate, delta: number): ReactCalendarDate {
    const d = new Date(date.year, date.month - 1, date.day + delta);
    return { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() };
}
function addMonths(date: ReactCalendarDate, delta: number): ReactCalendarDate {
    const d = new Date(date.year, date.month - 1 + delta, date.day);
    return { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() };
}
function addYears(date: ReactCalendarDate, delta: number): ReactCalendarDate {
    const d = new Date(date.year + delta, date.month - 1, date.day);
    return { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() };
}
