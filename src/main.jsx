import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Calendar, DatePicker } from './lib/index';

const today = new Date();
const disabledDay = [today.getFullYear(), today.getMonth() + 1, today.getDate() + 1];
const lastMonth = new Date();
lastMonth.setMonth(lastMonth.getMonth() - 1);

function ControlledDatePicker() {

    const [date, setDate] = useState(new Date());

    return <DatePicker
        selectedDay={date}
        onChange={(e, date) => setDate(date)}
        onSelect={(e, date) => setDate(date)}
        afterMonthPicker="ok"
        displayMonthPicker={true}
        diretion="TOP"
    />
}



createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Calendar
            onSelect={function() {
                console.log('select', arguments);
            }}
            isDisabledDay={function(...yearMonthDay) {
                return !disabledDay.filter((v, i) => yearMonthDay[i] !== v).length;
            }}
        />

        <h2>Date picker</h2>
        <DatePicker
            onSelect={function() {
                console.log('select', arguments);
            }}
            selectedDay={lastMonth}
            afterMonthPicker="ok"
            displayMonthPicker={true}
            diretion="TOP"
        />

        <h2>Controlled date picker</h2>
        <ControlledDatePicker/>
    </React.StrictMode>
);
