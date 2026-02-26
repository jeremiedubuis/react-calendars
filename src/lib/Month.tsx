import React, { memo } from 'react';

import { daysTitles, firstDay, libClassName, monthsTitles } from './helpers/configuration';
import { dateToCalendarDate } from './helpers/utils';
import MonthDay from './MonthDay';
import type { MonthProps, ReactCalendarDate } from './types';

function Month({
    displayMonthTitle,
    displayDayTitles,
    selectedDate,
    displayedDate,
    focusDate,
    isDisabledDay,
    setSelectedDate,
    dateClasses
}: MonthProps) {
    // Cache today's calendar date once per render
    const todayCal: ReactCalendarDate = dateToCalendarDate(new Date());
    const numberOfDays = propsToNumberOfDays(displayedDate.month, displayedDate.year);
    const offset = propsToOffset(displayedDate.month, displayedDate.year);

    return (
        <div className={`${libClassName}-month`}>
            {displayMonthTitle && monthsTitles[displayedDate.month - 1]}
            {displayDayTitles && (
                <ul className={`${libClassName}-day-titles`}>
                    {[...Array(7)].map((_, i) => (
                        <li key={i}>{daysTitles[i]}</li>
                    ))}
                </ul>
            )}
            <ul className={`${libClassName}-days`}>
                {[...Array(numberOfDays + offset)].map((_, i) => {
                    const dayDate = {
                        year: displayedDate.year,
                        month: displayedDate.month,
                        day: i - offset + 1
                    };
                    const isPlaceholder = i < offset;
                    return (
                        <li
                            className={
                                isPlaceholder
                                    ? `${libClassName}-day`
                                    : dayClassName(dayDate, selectedDate, dateClasses, todayCal)
                            }
                            key={i}
                        >
                            {!isPlaceholder && (
                                <MonthDay
                                    disabled={isDisabledDay?.(dayDate)}
                                    setSelectedDate={setSelectedDate}
                                    selectedDate={selectedDate}
                                    focusDate={focusDate}
                                    dayDate={dayDate}
                                />
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

function areMonthPropsEqual(prev: MonthProps, next: MonthProps) {
    // Re-render only if displayed month/year changes or selected date identity meaningfully changes
    const sameDisplayed =
        prev.displayedDate.year === next.displayedDate.year &&
        prev.displayedDate.month === next.displayedDate.month;
    const sameSelected =
        (prev.selectedDate === undefined && next.selectedDate === undefined) ||
        (prev.selectedDate !== undefined &&
            next.selectedDate !== undefined &&
            prev.selectedDate.year === next.selectedDate.year &&
            prev.selectedDate.month === next.selectedDate.month &&
            prev.selectedDate.day === next.selectedDate.day);
    const sameFlags =
        prev.displayDayTitles === next.displayDayTitles &&
        prev.displayMonthTitle === next.displayMonthTitle;
    const sameFns =
        prev.isDisabledDay === next.isDisabledDay && prev.setSelectedDate === next.setSelectedDate;
    const sameDateClasses = prev.dateClasses === next.dateClasses;
    const sameFocus =
        (!prev.focusDate && !next.focusDate) ||
        (!!prev.focusDate &&
            !!next.focusDate &&
            prev.focusDate.year === next.focusDate.year &&
            prev.focusDate.month === next.focusDate.month &&
            prev.focusDate.day === next.focusDate.day);
    return sameDisplayed && sameSelected && sameFlags && sameFns && sameDateClasses && sameFocus;
}

export default memo(Month, areMonthPropsEqual);

function propsToOffset(month: number, year: number) {
    // month is 1-based this effectively create a date at current month
    // firstDay is the index of the first day of the week (0 = Sunday, 1 = Monday, etc.)
    // offset is the number of days to subtract from the first day of the month to get to the first day of the week
    const offset = new Date(year, month - 1, 1).getDay() - firstDay;
    return offset >= 0 ? offset : 7 + offset;
}

function propsToNumberOfDays(month: number, year: number) {
    // month is 1-based this effectively create a date at current month + 1
    // setting the day to 0 effectively goes back to the last day of the previous month
    // if month is 12 (December) the date object treats it as january of the next year
    // and the 0 date goes back to december last day
    return new Date(year, month, 0).getDate();
}

function isDay(date: ReactCalendarDate, selectedDate: ReactCalendarDate | undefined) {
    return (
        selectedDate !== undefined &&
        date.year === selectedDate.year &&
        date.month === selectedDate.month &&
        date.day === selectedDate.day
    );
}

function dayClassName(
    dayDate: ReactCalendarDate,
    selectedDate: ReactCalendarDate | undefined,
    dateClasses?: [Date, string][],
    todayCal?: ReactCalendarDate
) {
    const c = [`${libClassName}-day`];
    if (isDay(dayDate, selectedDate)) c.push('is-selected');
    if (todayCal && isDay(todayCal, dayDate)) c.push('is-today');
    const dateClass =
        dateClasses && dateClasses.find(([date]) => isDay(dateToCalendarDate(date), dayDate));
    if (dateClass) c.push(dateClass[1]);
    return c.join(' ');
}
