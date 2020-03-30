import React from 'react';
import ReactDOM from 'react-dom';
import {libClassName} from './helpers/configuration';
import Calendar from './Calendar';
import parentHasClass from './helpers/parentHasClass';

class DatePicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            displayCalendar: false,
            value: props.selectedDay ? props.dateToValue(props.selectedDay) : '',
            selectedDay: props.selectedDay,
            month: props.month,
            year: props.year
        };

        this.calendarRef = React.createRef();
        this.inputRef = React.createRef();
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.onClickOutside);
        document.addEventListener('focus', this.onFocusOutside);
        document.addEventListener('keydown', this.onKeyDown);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.selectedDay !== this.props.selectedDay)
            this.setState({
                value: this.props.selectedDay ? this.props.dateToValue(this.props.selectedDay) : '',
                selectedDay: this.props.selectedDay
            });
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.onClickOutside);
        document.removeEventListener('focus', this.onFocusOutside);
    }

    render() {
        const {
            className,
            dataClasses,
            dateToValue,
            selectedDay,
            visibleMonths,
            displayDayTitles,
            displayMonthPicker,
            displayYearPicker,
            month,
            onSelect,
            renderMonthTitle,
            valueToDate,
            year,
            ...rest
        } = this.props;
        return <>
            <input ref={this.inputRef} className={`${libClassName}-date-picker ${this.props.className || ''}`} {...rest}
                   value={this.state.value} onFocus={this.onFocus} onChange={this.onChange} onClick={this.onClick}/>
            {this.renderCalendar()}
        </>;
    }

    renderCalendar() {
        if (this.state.displayCalendar)
            return ReactDOM.createPortal(
                <Calendar
                    reference={this.calendarRef}
                    style={this.getStyle()}
                    className="is-portal"
                    selectedDay={this.state.selectedDay}
                    visibleMonths={this.props.visibleMonths}
                    displayDayTitles={this.props.displayDayTitles}
                    displayMonthPicker={this.props.displayMonthPicker}
                    displayYearPicker={this.props.displayYearPicker}
                    month={this.state.month}
                    year={this.state.year}
                    onSelect={this.onDateSelection}
                    renderMonthTitle={this.props.renderMonthTitle}
                    dataClasses={this.props.dataClasses}
                    after={<button type="button" onClick={this.close} className="close-button">Close</button>}/>,
                document.getElementsByTagName('body')[0]
            );
    }

    onClick = (e) => this.setState({displayCalendar: true}, () => {
        if (typeof this.props.onClick === 'function') this.props.onClick(e);
    });

    onFocus = (e) => this.setState({displayCalendar: true}, () => {
        if (typeof this.props.onFocus === 'function') this.props.onFocus(e);
    });

    close = () => this.setState({displayCalendar: false});

    onChange = (e) => {
        const state = {
            value: e.target.value,
        };
        const previousDate = this.state.selectedDay;
        const selectedDay = this.props.valueToDate(e.target.value);
        if (selectedDay instanceof Date && !isNaN(selectedDay) && selectedDay.getFullYear() > 999) {
            state.selectedDay = selectedDay;
            state.month = selectedDay.getMonth();
            state.year = selectedDay.getFullYear();
        }
        this.setState(state, () => {
            if (typeof this.props.onChange === 'function') this.props.onChange(e);
            if (state.selectedDay && typeof this.props.onSelect === 'function')
                this.props.onSelect(e, selectedDay, previousDate);
        });
    };
    onDateSelection = (e, date, previousDate) => {
        this.setState({
            displayCalendar: false,
            value: this.props.dateToValue(date),
            selectedDay: date
        }, () => this.props.onSelect(e, date, previousDate));
    };

    getStyle() {
        if (this.props.getStyle) return this.props.getStyle(this.inputRef.current, this.calendarRef.current);
        const rect = this.inputRef.current.getBoundingClientRect();
        const style = {
            left: `${rect.left}px`
        };
        if (this.props.direction && this.props.direction.toUpperCase() === 'TOP') {
            style.bottom = document.documentElement.scrollHeight-rect.top;
        } else {
            style.top = `${rect.top+rect.height}px`;
        }

        return style;
    }

    onClickOutside = (e) => {
        if (e.button <= 1) {
            if (this.inputRef.current.contains(e.target) && !this.calendarRef || !this.calendarRef.current || !this.calendarRef.current.contains(e.target)) {
                if (!this.targetHasExcludedClass(e.target)) {
                    this.close();
                }
            }
        }
    };

    onFocusOutside = (e) => {
        if (this.inputRef.current.contains(e.target) && !this.calendarRef.current || !this.calendarRef.current.contains(e.target)) {
            this.close();
        }
    };

    onKeyDown = (e) => {
        if (e.key === "Escape") this.close();
    };

    targetHasExcludedClass(target, excludedClasses = []) {
        if (!excludedClasses.length) return false;
        return parentHasClass(target, ...excludedClasses);
    }

}

DatePicker.defaultProps = {
    dateToValue: date => date.toLocaleDateString(),
    valueToDate: value => {
        value = value.split(/[/.,-]/g).map(v => parseInt(v));
        const testValue = new Date(2020, 0, 25).toLocaleDateString().split(/[/.,-]/g).map(v => parseInt(v));
        const yearIndex = testValue.indexOf(2020);
        const monthIndex = testValue.indexOf(1);
        const dayIndex = testValue.indexOf(25);
        return new Date(value[yearIndex], value[monthIndex] - 1, value[dayIndex])
    },
    onSelect: () => {
    },
};

export default DatePicker;
