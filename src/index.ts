import dotenv from 'dotenv';
import { Express, NextFunction, Request, Response } from 'express';
import issues from './controllers/issues';
import elasticsearch from 'elasticsearch';
// import cors from 'cors';

const express = require('express');
const cors = require('cors');

// load environment
dotenv.config();

// elasticsearch connect
const esClient = new elasticsearch.Client({
    host: process.env.ES_HOST,
    log: 'error',
});

// prepare app
const app: Express = express();

// middleware
app.use(cors());

app.use((request: Request, response: Response, next: NextFunction) => {
    request.esClient = esClient;
    next();
});


// connect controllers
app.use('/issues', issues);

// starting server
app.listen(process.env.SERVER_PORT, () => {
    console.log('server started successfuly');
});
