import React from 'react';

class MonthDay extends React.Component {

    render() {
        return <button type="button" disabled={this.props.isDisabledDay(this.props.year, this.props.month+1, this.props.day)} onClick={this.onClick}>
            {this.props.day}
        </button>

    }

    onClick = (e) => {
        const _previousDay = this.props.selectedDay instanceof Date ? new Date(this.props.selectedDay.getTime()) : null;
        const selectedDay = new Date(this.props.year, this.props.month, this.props.day);
        this.props.selectDay(e, selectedDay, _previousDay);
    };

}

export default MonthDay;
