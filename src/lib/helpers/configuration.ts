import type { ConfigurationOptions, DaysTitles, MonthsTitles } from '../types';

export let firstDay = 1;
export let daysTitles: DaysTitles = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
export let monthsTitles: MonthsTitles = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

export let libClassName = 'react-calendar';

export let previousButton = 'Previous';
export let nextButton = 'Next';
export let previousMonthAriaLabel: string | undefined = 'Previous month';
export let nextMonthAriaLabel: string | undefined = 'Next month';
export let previousYearAriaLabel: string | undefined = 'Previous year';
export let nextYearAriaLabel: string | undefined = 'Next year';
export let calendarAriaLabel: string | undefined = 'Calendar';

export const setConfiguration = (o: ConfigurationOptions = {}) => {
    if (o.firstDay !== undefined) firstDay = o.firstDay;
    if (o.daysTitles !== undefined) daysTitles = o.daysTitles;
    if (o.monthsTitles !== undefined) monthsTitles = o.monthsTitles;
    if (o.libClassName !== undefined) libClassName = o.libClassName;
    if (o.previousButton !== undefined) previousButton = o.previousButton;
    if (o.nextButton !== undefined) nextButton = o.nextButton;
    if (o.previousMonthAriaLabel !== undefined) previousMonthAriaLabel = o.previousMonthAriaLabel;
    if (o.nextMonthAriaLabel !== undefined) nextMonthAriaLabel = o.nextMonthAriaLabel;
    if (o.previousYearAriaLabel !== undefined) previousYearAriaLabel = o.previousYearAriaLabel;
    if (o.nextYearAriaLabel !== undefined) nextYearAriaLabel = o.nextYearAriaLabel;
    if (o.calendarAriaLabel !== undefined) calendarAriaLabel = o.calendarAriaLabel;
};
