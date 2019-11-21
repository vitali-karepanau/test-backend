import dotenv from 'dotenv';
import elasticsearch from 'elasticsearch';

// load environment
dotenv.config();

const esClient = new elasticsearch.Client({
    host: process.env.ES_HOST,
    log: 'error',
});

esClient.cat.indices({ format: 'JSON' })
    .then(console.log)
    // tslint:disable-next-line:no-any
    .catch((error: any) => console.error(`Error connecting to the es client: ${error}`));
