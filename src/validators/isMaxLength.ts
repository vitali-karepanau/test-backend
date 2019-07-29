import { mix } from './';

export const isMaxLength = (row: mix, max: number) => {
    switch (typeof row) {
        case 'object':
        case 'string':
            return row.length <= max;
        case 'number':
            return row <= max;
        default:
            return false;
    }
};
