"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const users_1 = __importDefault(require("./controllers/users"));
// import UserSchema, { User } from './models/user';
// load environment
dotenv_1.default.config();
// connect mongoose
mongoose_1.default.connect(process.env.MONGO_CONNECT_URL, {
    useNewUrlParser: true,
}).then(() => {
    console.log('MongoDB connected successfuly');
}, err => {
    console.error('MongoDB wasn\'t connected');
    console.error(err);
});
// prepare app
const app = express_1.default();
// connect controllers
app.use('/users', users_1.default);
// starting server
app.listen(process.env.SERVER_PORT, () => {
    console.log('server started successfuly');
});
//# sourceMappingURL=index.js.map