"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no-any
const connectRule = (row, rule) => new Promise((resolve, reject) => {
    switch (rule) {
        case 'required':
            if (!row) {
                reject();
            }
            resolve();
            break;
    }
});
exports.validate = (data, rules) => new Promise((resolve, reject) => {
    let promises = [];
    for (const key in rules) {
        if (rules[key]) {
            promises = [
                ...promises,
                ...rules[key].map(item => connectRule(data[key], item)),
            ];
        }
    }
    Promise.all(promises).then(() => resolve(), () => reject());
});
//# sourceMappingURL=index.js.map