import {
    libClassName,
    monthsTitles,
    nextButton,
    previousButton,
    nextMonthAriaLabel,
    previousMonthAriaLabel
} from './helpers/configuration';
import type { MonthPickerProps } from './types';

export default function MonthPicker({
    displayedDate,
    setDisplayedDate,
    renderMonthTitle
}: MonthPickerProps) {
    return (
        <div className={`${libClassName}-month-picker`}>
            <button
                className="previous-button"
                type="button"
                aria-label={
                    previousMonthAriaLabel && previousMonthAriaLabel !== previousButton
                        ? previousMonthAriaLabel
                        : undefined
                }
                onClick={() => {
                    if (displayedDate.month > 1) {
                        setDisplayedDate((d) => ({ ...d, month: displayedDate.month - 1 }));
                    } else {
                        setDisplayedDate((d) => ({
                            ...d,
                            month: 12,
                            year: displayedDate.year - 1
                        }));
                    }
                }}
            >
                {previousButton}
            </button>
            {renderMonthTitle
                ? renderMonthTitle(displayedDate.month, displayedDate.year)
                : monthsTitles[displayedDate.month - 1]}
            <button
                className="next-button"
                type="button"
                aria-label={
                    nextMonthAriaLabel && nextMonthAriaLabel !== nextButton
                        ? nextMonthAriaLabel
                        : undefined
                }
                onClick={() => {
                    if (displayedDate.month < 12) {
                        setDisplayedDate((d) => ({ ...d, month: displayedDate.month + 1 }));
                    } else {
                        setDisplayedDate((d) => ({ ...d, month: 1, year: displayedDate.year + 1 }));
                    }
                }}
            >
                {nextButton}
            </button>
        </div>
    );
}
