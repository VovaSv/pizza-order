import { useState, useEffect } from 'react';
//This is debounce example of delya update value not liek standart debounce whiich create
// function wrapper to wrapper function and provide wrapped function delay.
export const useDebounce = (value: string, delay: number): string => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};