import React, { memo } from 'react';

import { monthsTitles } from './helpers/configuration';
import { dateToCalendarDate } from './helpers/utils';
import type { MonthDayProps, ReactCalendarDate } from './types';

function MonthDay({ dayDate, disabled, setSelectedDate, selectedDate, focusDate }: MonthDayProps) {
    const isSelected =
        !!selectedDate &&
        selectedDate.year === dayDate.year &&
        selectedDate.month === dayDate.month &&
        selectedDate.day === dayDate.day;
    const today: ReactCalendarDate = dateToCalendarDate(new Date());
    const isToday =
        today.year === dayDate.year && today.month === dayDate.month && today.day === dayDate.day;
    const isFocused =
        !!focusDate &&
        focusDate.year === dayDate.year &&
        focusDate.month === dayDate.month &&
        focusDate.day === dayDate.day;
    return (
        <button
            type="button"
            disabled={disabled}
            tabIndex={isFocused ? 0 : -1}
            data-cal-date={`${dayDate.year}-${String(dayDate.month).padStart(2, '0')}-${String(
                dayDate.day
            ).padStart(2, '0')}`}
            aria-selected={isSelected}
            aria-current={isToday ? 'date' : undefined}
            aria-label={`${monthsTitles[dayDate.month - 1]} ${dayDate.day}, ${dayDate.year}`}
            onClick={() => {
                setSelectedDate(dayDate);
            }}
        >
            {dayDate.day}
        </button>
    );
}

function areMonthDayPropsEqual(prev: MonthDayProps, next: MonthDayProps) {
    // Re-render if the cell day changes, disabled flag changes, or selection toggles this day
    const sameDay =
        prev.dayDate.year === next.dayDate.year &&
        prev.dayDate.month === next.dayDate.month &&
        prev.dayDate.day === next.dayDate.day;
    const sameDisabled = prev.disabled === next.disabled;
    const wasSelected =
        !!prev.selectedDate &&
        prev.selectedDate.year === prev.dayDate.year &&
        prev.selectedDate.month === prev.dayDate.month &&
        prev.selectedDate.day === prev.dayDate.day;
    const isSelected =
        !!next.selectedDate &&
        next.selectedDate.year === next.dayDate.year &&
        next.selectedDate.month === next.dayDate.month &&
        next.selectedDate.day === next.dayDate.day;
    const selectionAffectsThisCell = wasSelected !== isSelected;
    const sameSetter = prev.setSelectedDate === next.setSelectedDate;
    const sameFocus =
        (!prev.focusDate && !next.focusDate) ||
        (!!prev.focusDate &&
            !!next.focusDate &&
            prev.focusDate.year === next.focusDate.year &&
            prev.focusDate.month === next.focusDate.month &&
            prev.focusDate.day === next.focusDate.day);
    return sameDay && sameDisabled && !selectionAffectsThisCell && sameSetter && sameFocus;
}

export default memo(MonthDay, areMonthDayPropsEqual);
