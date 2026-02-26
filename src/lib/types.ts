import type React from 'react';

export type ReactCalendarDate = {
    year: number;
    month: number; // 1-based month (January is 1)
    day: number;
};

export type SetReactCalendarDate = React.Dispatch<React.SetStateAction<ReactCalendarDate>>;
export type SetOptionalReactCalendarDate = React.Dispatch<
    React.SetStateAction<ReactCalendarDate | undefined>
>;

export type DaysTitles = [string, string, string, string, string, string, string];
export type MonthsTitles = [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string
];

export type NullableDate = Date | null;
export type DateClassName = [Date, string];
export type DateClassNames = DateClassName[];
export type DisabledDayPredicate = (date: ReactCalendarDate) => boolean;
export type DaySelectionHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
    selectedDay: Date,
    previousDay: NullableDate
) => void;
export type MonthTitleRenderer = (month: number, year: number) => React.ReactNode;
export type CalendarDirection = 'TOP' | 'BOTTOM';

export type ConfigurationOptions = {
    firstDay?: number;
    daysTitles?: DaysTitles;
    monthsTitles?: MonthsTitles;
    libClassName?: string;
    previousButton?: string;
    nextButton?: string;
    previousMonthAriaLabel?: string;
    nextMonthAriaLabel?: string;
    previousYearAriaLabel?: string;
    nextYearAriaLabel?: string;
    calendarAriaLabel?: string;
};
export type MonthProps = {
    selectedDate?: ReactCalendarDate;
    displayedDate: ReactCalendarDate;
    focusDate?: ReactCalendarDate;
    dateClasses?: DateClassNames;
    isDisabledDay?: DisabledDayPredicate;
    displayMonthTitle?: boolean;
    displayDayTitles?: boolean;
    setSelectedDate: SetOptionalReactCalendarDate;
};

export type MonthDayProps = {
    dayDate: ReactCalendarDate;
    disabled?: boolean;
    selectedDate: ReactCalendarDate | undefined;
    focusDate?: ReactCalendarDate;
    setSelectedDate: SetOptionalReactCalendarDate;
};

export type MonthPickerProps = {
    displayedDate: ReactCalendarDate;
    setDisplayedDate: SetReactCalendarDate;
    renderMonthTitle?: MonthTitleRenderer;
};

export type YearPickerProps = {
    displayedYear: number;
    setDisplayedDate: SetReactCalendarDate;
};

export type DatePickerProps = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'onSelect' | 'value'
> & {
    after?: React.ReactNode;
    afterMonthPicker?: React.ReactNode;
    afterYearPicker?: React.ReactNode;
    className?: string;
    calendarClassName?: string;
    closeOnBlur?: boolean;
    excludedClasses?: string[];
    dateClasses?: DateClassNames;
    isDisabledDay?: DisabledDayPredicate;
    visibleMonths?: number;
    displayDayTitles?: boolean;
    displayMonthPicker?: boolean;
    displayYearPicker?: boolean;
    renderInput: (inputProps: React.InputHTMLAttributes<HTMLInputElement>) => React.ReactNode;
    renderMonthTitle?: MonthTitleRenderer;
    date?: ReactCalendarDate;
    // Fired when a date is selected from the calendar popup. Values use ReactCalendarDate shape.
    onSelect?: (
        date: ReactCalendarDate | undefined,
        previousDate: ReactCalendarDate | undefined
    ) => void;
    onChange?: (
        e: React.ChangeEvent<HTMLInputElement>,
        date: ReactCalendarDate | undefined,
        previousDate: ReactCalendarDate | undefined
    ) => void;
    direction?: CalendarDirection;
    getStyle?: (
        input: HTMLInputElement | null,
        calendar: HTMLDivElement | null
    ) => React.CSSProperties;
    valueToCalendarDate?: (value: string) => ReactCalendarDate | undefined;
    calendarDateToValue?: (date: ReactCalendarDate | undefined) => string;
};

export type CalendarProps = {
    className?: string;
    date?: ReactCalendarDate;
    /**
     * Uncontrolled initial value. Use this instead of `date` when you don't plan to control the selection from outside.
     * If both `date` and `defaultDate` are provided, `date` wins and the component is controlled.
     */
    defaultDate?: ReactCalendarDate;
    after?: React.ReactNode;
    afterYearPicker?: React.ReactNode;
    afterMonthPicker?: React.ReactNode;
    displayMonthTitle?: boolean;
    displayDayTitles?: boolean;
    displayMonthPicker?: boolean;
    displayYearPicker?: boolean;
    style?: React.CSSProperties;
    /**
     * Tab index applied to the Calendar container. Use -1 to allow programmatic focus without adding it to the tab order.
     * If undefined, the container will not receive a tabIndex attribute.
     */
    containerTabIndex?: number;
    visibleMonths?: number;
    dateClasses?: DateClassNames;
    onSelect: (date: ReactCalendarDate | undefined) => void;
    renderMonthTitle?: MonthTitleRenderer;
    isDisabledDay?: DisabledDayPredicate;
};
