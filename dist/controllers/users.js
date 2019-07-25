"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validators_1 = __importDefault(require("../validators"));
const users = express_1.default.Router();
const get = (request, response) => {
    const rules = {
        email: ['required'],
        password: ['required'],
    };
    const data = {
        email: 'data',
        password: 'sd',
    };
    validators_1.default(data, rules).then(() => {
        console.log('valid');
        response.send('read');
    }, () => {
        console.log('non-valid');
        response.send('read');
    });
};
const post = (request, response) => {
    response.send('created');
};
const put = (request, response) => {
    response.send('updated');
};
const remove = (request, response) => {
    response.send('removed');
};
users.route('/')
    .get(get)
    .post(post)
    .put(put)
    .delete(remove);
exports.default = users;
//# sourceMappingURL=users.js.map