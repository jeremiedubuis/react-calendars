import { render, fireEvent, cleanup } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';

import { DatePicker } from '../DatePicker';

function type(input: HTMLInputElement, value: string) {
    fireEvent.change(input, { target: { value } });
}

afterEach(() => {
    cleanup();
});

describe('DatePicker parsing', () => {
    it('accepts valid leap day (2024-02-29) and passes parsed date to onChange', () => {
        const onChange = vi.fn();
        const { container } = render(<DatePicker aria-label="dp" onChange={onChange} />);
        const input = container.querySelector('input[role="combobox"]') as HTMLInputElement;
        type(input, '2024-02-29');
        expect(input.value).toBe('2024-02-29');
        expect(onChange).toHaveBeenLastCalledWith(
            expect.any(Object),
            { year: 2024, month: 2, day: 29 },
            undefined
        );
    });

    it('rejects invalid date (2025-02-31) and passes undefined to onChange', () => {
        const onChange = vi.fn();
        const { container } = render(<DatePicker aria-label="dp" onChange={onChange} />);
        const input = container.querySelector('input[role="combobox"]') as HTMLInputElement;
        type(input, '2025-02-31');
        expect(input.value).toBe('2025-02-31');
        expect(onChange).toHaveBeenLastCalledWith(expect.any(Object), undefined, undefined);
    });

    it('rejects month out of range and passes undefined to onChange', () => {
        const onChange = vi.fn();
        const { container } = render(<DatePicker aria-label="dp" onChange={onChange} />);
        const input = container.querySelector('input[role="combobox"]') as HTMLInputElement;
        type(input, '2025-13-10');
        expect(input.value).toBe('2025-13-10');
        expect(onChange).toHaveBeenLastCalledWith(expect.any(Object), undefined, undefined);
    });
});
