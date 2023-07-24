import React from 'react';
import { libClassName } from './helpers/configuration';
import Month from './Month';
import MonthPicker from './MonthPicker';
import YearPicker from './YearPicker';

class Calendar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedDay: this.props.selectedDay,
            month: props.month,
            year: props.year
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.year !== prevProps.year || this.props.month !== prevProps.month || this.props.selectedDay !== prevProps.selectedDay)
            this.setState({
                selectedDay: this.props.selectedDay,
                year: this.props.year,
                month: this.props.month
            })
    }

    render() {
        return <div ref={this.props.reference} className={`${libClassName} ${this.props.className || ''}`} style={this.props.style}>

            { this.props.displayYearPicker && <YearPicker
                setYear={this.setYear}
                year={this.state.year} />}

            {this.props.displayYearPicker && this.props.afterYearPicker}

            { this.props.displayMonthPicker && <MonthPicker
                month={this.state.month}
                renderMonthTitle={this.props.renderMonthTitle}
                setMonth={this.setMonth}
                setYear={this.setYear}
                year={this.state.year} />}

            { this.props.displayMonthPicker && this.props.afterMonthPicker }

            <ul className={`${libClassName}-months`}>
                {[...Array(this.props.visibleMonths)].map((_, i) =>
                    <li key={i}>
                        <Month
                            isDisabledDay={this.props.isDisabledDay}
                            dateClasses={this.props.dateClasses}
                            displayMonthTitle={this.props.displayMonthTitle}
                            displayDayTitles={this.props.displayDayTitles}
                            month={this.state.month}
                            onSelect={this.props.onSelect}
                            selectDay={this.selectDay}
                            selectedDay={this.state.selectedDay}
                            visibleMonths={this.props.visibleMonths}
                            year={this.state.year} />
                    </li>
                )}
            </ul>

            {this.props.after}
        </div>
    }

    selectDay = (e, selectedDay, previousDay) => {
        this.setState({
            selectedDay,
        }, () => this.props.onSelect(e, selectedDay, previousDay));
    };

    setMonth = (month) => {
        this.setState({ month });
    };

    setYear = (year) => {
        this.setState({ year });
    };

}

Calendar.defaultProps = {
    dateClasses: [],
    isDisabledDay: () => false,
    displayDayTitles: true,
    displayMonthPicker: true,
    displayYearPicker: true,
    month: new Date().getMonth(),
    onSelect: () => {},
    visibleMonths: 1,
    year: new Date().getFullYear()
};

export default Calendar;
