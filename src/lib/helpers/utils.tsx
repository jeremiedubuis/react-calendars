import type { Ref } from 'react';

import type { ReactCalendarDate } from '../types';
export function dateToCalendarDate(date: Date): ReactCalendarDate {
    return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
    };
}

export function mergeRefs<T>(...refs: Array<Ref<T> | undefined>) {
    return (value: T | null) => {
        for (const ref of refs) {
            if (!ref) continue;
            if (typeof ref === 'function') {
                ref(value);
            } else {
                ref.current = value;
            }
        }
    };
}
