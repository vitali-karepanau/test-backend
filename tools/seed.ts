import dotenv from 'dotenv';
import elasticsearch from 'elasticsearch';

// load environment
dotenv.config();

const esClient = new elasticsearch.Client({
    host: process.env.ES_HOST,
    // port: process.env.ES_PORT,
    log: 'error',
});

interface Row {
    symptom: string;
    solutions: Array<string>;
}

const seed = () => {
    const data = require('./sample-data.json');

    const bulkBody: any[] = [];

    Object.keys(data).forEach(
        (key: string) => {
            if (key && data[key]) {
                data[key].forEach(
                    (row: Row) => {
                        bulkBody.push({
                            index: {
                                _index: 'issues',
                                _type: key,
                            }
                        });

                        bulkBody.push({
                            point: key,
                            ...row,
                        });
                    }
                )
            }
        }
    );

    esClient.bulk({body: bulkBody})
        .then(() => console.log('Data is seeded'))
        .catch(console.error);
};

seed();
