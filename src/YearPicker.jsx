import React from 'react';
import {libClassName} from './helpers/configuration';

class YearPicker extends React.Component {

    render() {
        return <div className={`${libClassName}-year-picker`}>
            <button className="previous-button" type="button" onClick={this.onClickPrevious}>
                Previous
            </button>
            {this.props.year}
            <button className="next-button" type="button" onClick={this.onClickNext}>
                Next
            </button>
        </div>
    }

    onClickPrevious = () => this.props.setYear(this.props.year-1);
    onClickNext = () => this.props.setYear(this.props.year+1);

}

export default YearPicker;
