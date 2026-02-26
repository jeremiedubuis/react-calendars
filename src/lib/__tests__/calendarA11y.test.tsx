import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, beforeAll, afterAll, afterEach, vi } from 'vitest';

import { Calendar } from '../Calendar';
import { dateToCalendarDate } from '../helpers/utils';

describe('Calendar a11y', () => {
    beforeAll(() => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date(2025, 9, 20));
    });
    afterAll(() => {
        vi.useRealTimers();
    });
    afterEach(() => cleanup());
    it('renders aria-labels and selection attributes on day buttons', () => {
        const today = new Date(2025, 9, 20); // Oct 20, 2025
        const todayCal = dateToCalendarDate(today);

        render(<Calendar defaultDate={todayCal} displayDayTitles onSelect={() => {}} />);

        const label = 'October 20, 2025';
        const dayButton = screen.getByRole('button', { name: label });
        expect(dayButton).toBeInTheDocument();
        expect(dayButton).toHaveAttribute('aria-current', 'date');
        expect(dayButton).toHaveAttribute('aria-selected', 'true');

        // Clicking another day updates selection
        const other = screen.getByRole('button', { name: 'October 21, 2025' });
        fireEvent.click(other);
        expect(other).toHaveAttribute('aria-selected', 'true');
    });
});
