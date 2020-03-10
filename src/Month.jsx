import React from 'react';
import MonthDay from './MonthDay';
import { daysTitles, firstDay, libClassName, monthsTitles} from './helpers/configuration';

class Month extends React.Component {

    constructor(props) {
        super(props);
        this.state = Month.getDerivedStateFromProps(props);
    }

    static getDerivedStateFromProps(props) {
        const offset = new Date(props.year, props.month, 1).getDay() - firstDay;
        return {
            numberOfDays: new Date(props.month + 1 > 11 ? props.year + 1 : props.year, props.month + 1 > 11 ? props.month + 1 : 0, 0).getDate(),
            offset: offset > 0 ? offset : 7+offset
        }
    }

    isDay = (date, day) =>
        date instanceof Date
        && this.props.year === date.getFullYear()
        && this.props.month === date.getMonth()
        && day === date.getDate();

    isToday = (day) =>
        this.isDay(new Date(), day);

    getDayClass(day) {
        const c = [`${libClassName}-day`];
        if (this.props.selectedDay && this.isDay(this.props.selectedDay, day)) c.push('is-selected');
        if (this.isToday(day)) c.push('is-today');
        const dateClass = this.props.dateClasses.find(([date]) => this.isDay(date, day));
        if (dateClass) c.push(dateClass[1]);
        return c.join(' ');
    }

    render() {
        return <div className={`${libClassName}-month`}>

            {this.props.displayMonthTitle && monthsTitles[this.props.month]}
            {this.props.displayDayTitles &&
            <ul className={`${libClassName}-day-titles`}>
                {[...Array(7)].map((_, i) =>
                    <li key={i}>
                        {daysTitles[i]}
                    </li>)}
            </ul>}
            <ul className={`${libClassName}-days`}>
                {[...Array(this.state.numberOfDays + this.state.offset)].map((_, i) =>
                    <li className={this.getDayClass(i - this.state.offset + 1)} key={i}>
                        {i >= this.state.offset &&
                        <MonthDay
                            day={i - this.state.offset + 1}
                            selectDay={this.props.selectDay}
                            selectedDay={this.props.selectedDay}
                            month={this.props.month}
                            year={this.props.year}
                            onSelect={this.props.onSelect}/>}
                    </li>
                )}
            </ul>
        </div>
    }

}

export default Month;
