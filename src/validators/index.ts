// tslint:disable-next-line:no-any
const connectRule = (row: any, rule: string) =>
    new Promise((resolve, reject) => {
        switch (rule) {
            case 'required':
                if (!row) {
                    reject();
                }
                resolve();
                break;
        }
    });

export const validate = (data: object, rules: object) =>
    new Promise((resolve, reject) => {
        let promises: Promise[] = [];
        for (const key in rules) {
            if (rules[key]) {
                promises = [
                    ...promises,
                    ...rules[key].map(item => connectRule(data[key], item)),
                ];
            }
        }
        Promise.all(promises).then(
            () => resolve(),
            () => reject()
        );
    });
