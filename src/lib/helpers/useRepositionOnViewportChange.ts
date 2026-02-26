import { useEffect, useRef, useState } from 'react';

/**
 * Triggers a component re-render on window scroll/resize while active, debounced.
 * Useful to recompute portal positioning without exposing state to the parent.
 */
export default function useRepositionOnViewportChange(active: boolean, delay = 300) {
    const [, setTick] = useState(0);
    const timeoutRef = useRef<number | null>(null);

    useEffect(() => {
        if (!active) return;

        const schedule = () => {
            if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
            timeoutRef.current = window.setTimeout(() => {
                setTick((t) => t + 1);
                timeoutRef.current = null;
            }, delay);
        };

        const onScroll = () => schedule();
        const onResize = () => schedule();

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onResize);
            if (timeoutRef.current !== null) {
                window.clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
        };
    }, [active, delay]);
}
