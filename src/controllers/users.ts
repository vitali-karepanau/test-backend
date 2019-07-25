import express, { Request, Response } from 'express';
import validate from '../validators';

const users = express.Router();

const get = (request: Request, response: Response) => {
    const rules = {
        email: ['required'],
        password: ['required'],
    };
    const data = {
        email: 'data',
        password: 'sd',
    };
    validate(data, rules).then(
        () => {
            console.log('valid');
            response.send('read');
        },
        () => {
            console.log('non-valid');
            response.send('read');
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
