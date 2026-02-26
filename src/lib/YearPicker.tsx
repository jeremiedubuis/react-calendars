import {
    libClassName,
    nextButton,
    previousButton,
    nextYearAriaLabel,
    previousYearAriaLabel
} from './helpers/configuration';
import type { YearPickerProps } from './types';

export default function YearPicker({ displayedYear, setDisplayedDate }: YearPickerProps) {
    return (
        <div className={`${libClassName}-year-picker`}>
            <button
                className="previous-button"
                type="button"
                aria-label={
                    previousYearAriaLabel && previousYearAriaLabel !== previousButton
                        ? previousYearAriaLabel
                        : undefined
                }
                onClick={() => setDisplayedDate((d) => ({ ...d, year: displayedYear - 1 }))}
            >
                {previousButton}
            </button>
            {displayedYear}
            <button
                className="next-button"
                type="button"
                aria-label={
                    nextYearAriaLabel && nextYearAriaLabel !== nextButton
                        ? nextYearAriaLabel
                        : undefined
                }
                onClick={() => setDisplayedDate((d) => ({ ...d, year: displayedYear + 1 }))}
            >
                {nextButton}
            </button>
        </div>
    );
}
