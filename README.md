## react-calendars

A lightweight, unstyled React calendar and date picker with accessible markup, TypeScript types, and simple global configuration.

- 1-based months (January = 1)
- Works as a simple Calendar or as an input DatePicker
- Controlled and uncontrolled usage patterns
- No CSS included on purpose — bring your own styles using predictable class names
- Small, framework-agnostic API surface

## Installation

Install with your favorite package manager (React and ReactDOM are peer dependencies):

```bash
# npm
npm install react-calendars

# pnpm
pnpm add react-calendars

# yarn
yarn add react-calendars
```

## Quick start

```tsx
import React, { useState } from 'react';
import { Calendar, DatePicker, dateToCalendarDate, setConfiguration } from 'react-calendars';

// Optional: set library-wide configuration (i18n, labels, first day of week, base class name, ...)
setConfiguration({
    firstDay: 1, // Monday
    daysTitles: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
    monthsTitles: [
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
    ],
    libClassName: 'react-calendar',
    previousButton: 'Prev',
    nextButton: 'Next'
});

export default function App() {
    const [selected, setSelected] = useState(dateToCalendarDate(new Date()));

    return (
        <div>
            <h2>Calendar</h2>
            <Calendar
                date={selected}
                onSelect={(d) => setSelected(d ?? selected)}
                displayMonthPicker
                displayYearPicker
                displayDayTitles
            />

            <h2 style={{ marginTop: 24 }}>DatePicker</h2>
            <DatePicker
                date={selected}
                onChange={(e, date /* ReactCalendarDate | undefined */) =>
                    setSelected(date ?? selected)
                }
                onSelect={(date /* ReactCalendarDate | undefined */, prev) =>
                    setSelected(date ?? prev ?? selected)
                }
                // open above or below the input
                direction="TOP"
            />
        </div>
    );
}
```

## Exports

- `Calendar`: A calendar view component.
- `DatePicker`: An input that opens a calendar in a portal.
- `setConfiguration(options)`: Set library-wide configuration (i18n, class name, labels...).
- `dateToCalendarDate(date: Date)`: Utility to convert a native `Date` to `ReactCalendarDate`.

## Types at a glance

- `ReactCalendarDate`: `{ year: number; month: number; day: number }` with 1-based `month` (1–12)
- `DateClassNames`: `Array<[Date, string]>` to add class names to exact dates
- `DisabledDayPredicate`: `(date: ReactCalendarDate) => boolean`

## Calendar

```tsx
import { Calendar } from 'react-calendars';

<Calendar onSelect={(d) => console.log(d)} />;
```

Props (all optional unless stated):

- `className?: string` – extra class for the root container
- `style?: React.CSSProperties` – inline style for the root container
- `date?: ReactCalendarDate` – controlled selected date (keep it in sync on `onSelect`)
- `defaultDate?: ReactCalendarDate` – uncontrolled initial selected date
- `visibleMonths?: number` – number of months to render at once (default: 1)
- `displayMonthTitle?: boolean` – show the month name above the grid (default: false)
- `displayDayTitles?: boolean` – show day titles row (default: false)
- `displayMonthPicker?: boolean` – show month navigation header (default: true)
- `displayYearPicker?: boolean` – show year navigation header (default: true)
- `dateClasses?: Array<[Date, string]>` – add class names to specific days
- `isDisabledDay?: (d: ReactCalendarDate) => boolean` – disable specific days
- `renderMonthTitle?: (month: number, year: number) => React.ReactNode` – custom month title renderer
- `after?: React.ReactNode` – render content after months (e.g., a footer)
- `afterYearPicker?: React.ReactNode` – render content after the year picker
- `afterMonthPicker?: React.ReactNode` – render content after the month picker
- `onSelect: (date: ReactCalendarDate | undefined) => void` – called when a day is selected

Notes:

- The component uses 1-based months. If you come from `Date`, prefer `dateToCalendarDate(new Date())`.
- Controlled vs uncontrolled: use `date` for controlled usage, or `defaultDate` when uncontrolled. If both are provided, `date` wins.
- The library doesn’t include styles; see “Styling” to target the generated structure.

## DatePicker

```tsx
import { DatePicker } from 'react-calendars';

<DatePicker
    date={/* ReactCalendarDate | undefined */}
    onChange={(e, date, prev) => console.log('changed', date, prev)}
    onSelect={(date, prev) => console.log('selected', date, prev)}
/>;
```

Ref forwarding:

The `DatePicker` component forwards its ref to the underlying `<input>` element, so you can programmatically focus or read the value.

```tsx
import { useRef } from 'react';
import { DatePicker } from 'react-calendars';

function Example() {
    const inputRef = useRef<HTMLInputElement>(null);
    return (
        <>
            <button type="button" onClick={() => inputRef.current?.focus()}>
                Focus input
            </button>
            <DatePicker ref={inputRef} />
        </>
    );
}
```

Props (in addition to standard `<input>` props, except `onChange`/`onSelect` which are overridden):

- `className?: string` – additional class for the input element
- `calendarClassName?: string` – additional class for the calendar container (portal)
- `closeOnBlur?: boolean` – close the calendar popup when the input loses focus (default: false)
- `direction?: 'TOP' | 'BOTTOM'` – where to open the calendar relative to input (default: 'BOTTOM')
- `getStyle?: (input: HTMLInputElement | null, calendar: HTMLDivElement | null) => React.CSSProperties` – fully control the portal’s absolute positioning style
- `excludedClasses?: string[]` – if a click target or any of its parents has one of these class names, outside-click will not close the calendar
- `visibleMonths?: number` – number of months to render (default: 1)
- `displayDayTitles?: boolean` – show day titles (default: true)
- `displayMonthPicker?: boolean` – show month navigation (default: true)
- `displayYearPicker?: boolean` – show year navigation (default: true)
- `renderMonthTitle?: (month: number, year: number) => React.ReactNode` – custom month title renderer
- `dateClasses?: Array<[Date, string]>` – add class names to specific dates
- `isDisabledDay?: (d: ReactCalendarDate) => boolean` – disable dates in the calendar
- `after?: React.ReactNode` – render content below the calendar grid (a “Clear” button, etc.)
- `afterMonthPicker?: React.ReactNode` – render content after the month picker
- `afterYearPicker?: React.ReactNode` – render content after the year picker
- `date?: ReactCalendarDate` – control the selected date; when provided, the input displays that date
- `valueToCalendarDate?: (value: string) => ReactCalendarDate | undefined` – parse input value to `ReactCalendarDate` (default: "YYYY-MM-DD")
- `calendarDateToValue?: (date: ReactCalendarDate | undefined) => string` – format calendar date to input value (default: "YYYY-MM-DD")
- `onChange?: (e: React.ChangeEvent<HTMLInputElement>, date: ReactCalendarDate | undefined, previousDate: ReactCalendarDate | undefined) => void` – called when the input value changes (typing)
- `renderInput?: (inputProps: React.InputHTMLAttributes<HTMLInputElement>) => React.ReactNode` – render a custom input element instead of the default `<input>`. Receives the full set of props (ARIA attributes, event handlers, `value`, `className`, etc.) that must be spread onto your element for correct behavior.

Important behavioral notes:

- Opening/closing: opens on focus/click, closes on Escape, outside click, or when selecting a date.
- Positioning: by default, it attaches a portal div to `<body>` and positions it under the input; use `direction` or `getStyle` for precise control.
- Controlled usage: pass a `date` and update it in response to `onChange` when users type. The input’s displayed value is derived from `calendarDateToValue(date)`.
- Programmatic selection: when a date is selected in the calendar, the input’s value updates and `onSelect` is fired with `(date, previousDate)` using `ReactCalendarDate` shape.
- Ref behavior: the component forwards its ref to the input element for imperative focus and value access.- `closeOnBlur`: by default the calendar stays open when focus moves elsewhere inside the page; set `closeOnBlur` to close it whenever the input loses focus.
- `renderInput`: when provided, the default `<input>` is replaced by whatever your function returns. You **must** spread the received `inputProps` onto the target element to preserve ARIA attributes, event handlers, and value binding.

```tsx
<DatePicker
    date={selected}
    onSelect={(date) => setSelected(date ?? selected)}
    renderInput={(inputProps) => (
        <input
            {...inputProps}
            placeholder="YYYY-MM-DD"
            inputMode="numeric"
            style={{ border: '1px solid #ccc', padding: '6px 10px' }}
        />
    )}
/>
```

## Global configuration (i18n, labels, base class)

Use `setConfiguration` once at app start to change defaults:

```ts
import { setConfiguration } from 'react-calendars';

setConfiguration({
    firstDay: 1, // 0 = Sunday, 1 = Monday, ...
    daysTitles: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
    monthsTitles: [
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
    ],
    libClassName: 'react-calendar',
    previousButton: 'Previous',
    nextButton: 'Next',
    previousMonthAriaLabel: 'Previous month',
    nextMonthAriaLabel: 'Next month',
    previousYearAriaLabel: 'Previous year',
    nextYearAriaLabel: 'Next year',
    calendarAriaLabel: 'Calendar'
});
```

Defaults:

- `firstDay`: 1 (Monday)
- `daysTitles`: `['MON','TUE','WED','THU','FRI','SAT','SUN']`
- `monthsTitles`: English month names
- `libClassName`: `react-calendar`
- Button text: `Previous` / `Next`
- ARIA labels: "Previous month", "Next month", "Previous year", "Next year"

## Styling (bring your own CSS)

Class name structure (assuming default `libClassName = 'react-calendar'`):

- `.react-calendar` – calendar root
- `.react-calendar-year-picker` – container with year and prev/next year buttons
    - `.previous-button`, `.next-button`
- `.react-calendar-month-picker` – container with month title and prev/next month buttons
    - `.previous-button`, `.next-button`
- `.react-calendar-month` – month block
    - `.react-calendar-day-titles` – the weekday titles row (as a `<ul>`)
    - `.react-calendar-days` – the days grid (as a `<ul>` of `<li>`s)
    - `.react-calendar-day` – class applied to each day `<li>`; extra classes may be added via `dateClasses`
        - modifiers: `.is-selected`, `.is-today`
- `.react-calendar-months` – list containing one or more months
- `.react-calendar-date-picker` – the input element class
- The calendar portal root gets `is-portal` on the calendar container and includes a `.close-button` by default.

Minimal example:

```css
.react-calendar {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 8px;
    background: #fff;
}
.react-calendar-year-picker,
.react-calendar-month-picker {
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
}
.react-calendar-day-titles,
.react-calendar-days,
.react-calendar-months {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 4px;
}
.react-calendar-day-titles li {
    font-size: 12px;
    text-align: center;
    color: #666;
}
.react-calendar-days li {
    text-align: center;
}
.react-calendar-day button {
    width: 32px;
    height: 32px;
    border-radius: 6px;
    border: 1px solid transparent;
    background: transparent;
    cursor: pointer;
}
.react-calendar-day.is-today button {
    border-color: #999;
}
.react-calendar-day.is-selected button {
    background: #0d6efd;
    color: white;
    border-color: #0d6efd;
}
.react-calendar-date-picker {
    width: 220px;
    padding: 8px 10px;
}
.is-portal {
    position: absolute;
    z-index: 1000;
}
```

## Accessibility

- The `DatePicker` renders an input with `role="combobox"` and a portal with `role="dialog"`/`aria-modal="true"`.
- Navigation buttons include configurable ARIA labels via `setConfiguration`.
- The calendar closes on Escape and outside click. Focus moves to the active day inside the calendar when opened and returns to the input on close. The dialog does not trap focus; tab order remains natural for integration.

### Keyboard navigation

When the calendar is focused:

- Arrow Left/Right: move by 1 day
- Arrow Up/Down: move by 7 days
- Home/End: jump to start/end of the week (respects configured `firstDay`)
- PageUp/PageDown: previous/next month
- Shift + PageUp/PageDown: previous/next year
- Enter or Space: select the focused day
- Escape: close the `DatePicker` popup (when open)

From the input (when the popup is closed):

- Arrow Down: open the calendar popup

## Utility: dateToCalendarDate

```ts
import { dateToCalendarDate } from 'react-calendars';

const d = dateToCalendarDate(new Date()); // { year: 2025, month: 10, day: 20 }
```

## Edge cases and tips

- Months are 1-based throughout the API. Use `dateToCalendarDate` to convert native `Date` objects.
- To disable specific days, provide `isDisabledDay` that returns `true` for dates you want disabled.
- To highlight special dates, pass `dateClasses` as `[[new Date(2025, 0, 1), 'is-holiday']]`.
- If you need to control where the calendar opens, set `direction="TOP"` or provide a custom `getStyle` to position the portal.
- Outside-click closing can skip elements with classes in `excludedClasses`.

## Mobile tips

- Prefer setting the input to `readOnly` on phones to prevent the soft keyboard while still opening the calendar on focus/tap.
- If you allow typing, consider `inputMode="numeric"` and a guiding `placeholder` (e.g., `YYYY-MM-DD`).
- Use `direction="TOP"` or a custom `getStyle` near the bottom of the screen to avoid keyboard overlap; the popup repositions on scroll/resize automatically.
- Ensure touch targets are at least 44×44px: increase padding/size of day buttons and navigation buttons in your CSS.
- Give the portal container a high `z-index` and `position: absolute` (the root gets `.is-portal`).
- Use `excludedClasses` to prevent outside-tap closing for elements you control (e.g., a wrapper button/icon).
