import { mix } from './';

export const isMinLength = (row: mix, min: number) => {
    switch (typeof row) {
        case 'object':
        case 'string':
            return row.length >= min;
        case 'number':
            return row >= min;
        default:
            return false;
    }
};
