import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

import { Calendar, DatePicker, dateToCalendarDate } from './lib/index';
import type { ReactCalendarDate } from './lib/types';

const today = new Date();
const disabledDay = [today.getFullYear(), today.getMonth() + 1, today.getDate() + 1];
const lastMonth = new Date();
lastMonth.setMonth(lastMonth.getMonth() - 1);

function ControlledDatePicker() {
    const [date, setDate] = useState<ReactCalendarDate | undefined>(dateToCalendarDate(new Date()));

    return (
        <>
            <button
                onClick={() => {
                    const d = new Date();
                    d.setDate(d.getDate() + 1);
                    setDate(dateToCalendarDate(d));
                }}
            >
                Change date to tomorrow
            </button>
            <DatePicker
                date={date}
                onChange={(e, date) => setDate(date)}
                onSelect={(date) => setDate(date)}
                afterMonthPicker="ok"
                displayMonthPicker={true}
                direction="TOP"
            />
        </>
    );
}

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <h2>Calendar</h2>
        <Calendar
            onSelect={function () {
                console.log('select', arguments);
            }}
            isDisabledDay={function (date) {
                return (
                    disabledDay[0] === date.year &&
                    disabledDay[1] === date.month &&
                    disabledDay[2] === date.day
                );
            }}
        />

        <h2>Date picker</h2>
        <DatePicker
            onSelect={function (date, prev) {
                console.log('select', date, prev);
            }}
            date={dateToCalendarDate(lastMonth)}
            afterMonthPicker="ok"
            displayMonthPicker={true}
            direction="TOP"
        />

        <h2>Controlled date picker</h2>
        <ControlledDatePicker />
    </React.StrictMode>
);
