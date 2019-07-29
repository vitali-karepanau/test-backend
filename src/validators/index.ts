import { isEmail } from './isEmail';
import { isMaxLength } from './isMaxLength';
import { isMinLength } from './isMinLength';
import { isNumber } from './isNumber';
import { isRequired } from './isRequired';

export interface Rules {
    [key: string]: string[];
}

export interface ValidateResult {
    [key: string]: boolean;
}

// tslint:disable-next-line:no-any
export type mix = string | number | undefined | null | any | object;

const checkRule = (row: mix, rule: string) => {
    const [
        nameOfRule,
        param,
    ] = rule.split(':');
    switch (nameOfRule) {
        case 'required':
            return isRequired(row);
        case 'email':
            return isEmail(row);
        case 'number':
            return isNumber(row);
        case 'max':
            return isMaxLength(row, parseInt(param, 10));
        case 'min':
            return isMinLength(row, parseInt(param, 10));
        default:
            return false;
    }
};

const validateRow = (row: mix, rules: string[]) =>
    rules.reduce(
        (pV: boolean, cV: string) => pV && checkRule(row, cV),
        true
    );

// tslint:disable-next-line:no-any
export const validate = (data: any, rules: Rules) =>
    new Promise((resolve, reject) => {
        const validateResult: ValidateResult = {};
        let total = true;

        for (const key in rules) {
            if (data[key] && rules[key]) {
                validateResult[key] = validateRow(data[key], rules[key]);
                total = total && validateResult[key];
            } else {
                validateResult[key] = false;
                total = false;
            }
        }

        if (!total) {
            reject(validateResult);
        }
        resolve(validateResult);
    });
