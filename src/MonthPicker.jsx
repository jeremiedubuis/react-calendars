import React from 'react';
import {libClassName, monthsTitles} from './helpers/configuration';

class MonthPicker extends React.Component {

    render() {
        return <div className={`${libClassName}-month-picker`}>
            <button className="previous-button" type="button" onClick={this.onClickPrevious}>
                Previous
            </button>
            {monthsTitles[this.props.month]}
            <button className="next-button" type="button" onClick={this.onClickNext}>
                Next
            </button>
        </div>
    }

    onClickPrevious = () => {
        if (this.props.month > 0) {
            this.props.setMonth(this.props.month-1);
        }
        else {
            this.props.setMonth(11);
            this.props.setYear(this.props.year-1);
        }
    };

    onClickNext = () => {
        if (this.props.month < 11) {
            this.props.setMonth(this.props.month+1);
        }
        else {
            this.props.setMonth(0);
            this.props.setYear(this.props.year+1);
        }
    };

}

export default MonthPicker;
