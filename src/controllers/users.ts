import express, { Request, Response } from 'express';
import { Rules, validate, ValidateResult } from '../validators';

const users = express.Router();

const get = (request: Request, response: Response) => {
    const rules: Rules = {
        email: ['required', 'min:4'],
        password: ['required', 'max:5'],
    };
    const data = {
        email: 'dat',
        password: 'sd',
    };
    validate(data, rules).then(
        () => {
            response.json({});
        },
        (result: ValidateResult) => {
            response.status(400).json(result);
        }
    );
};

const post = (request: Request, response: Response) => {
    response.send('created');
};

const put = (request: Request, response: Response) => {
    response.send('updated');
};

const remove = (request: Request, response: Response) => {
    response.send('removed');
};

users.route('/')
    .get(get)
    .post(post)
    .put(put)
    .delete(remove);

export default users;
