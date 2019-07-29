import { mix } from './';

export const isEmail = (row: mix) =>
    typeof row === 'string' &&
        /[a-zA-Z0-9\_\-].?@[a-zA-Z0-9\_\-].?\.[a-zA-Z0-9\_\-]./.test(row);
