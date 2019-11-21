/* tslint:disable */
import express, { Request, Response } from 'express';

const users = express.Router();

const get = (request: Request, response: Response) => {
    const {
        page = 1,
        query = ''
    } = request.query;

    const fuzziness = query.split(' ').reduce((pV: number, cV: string) => {
        if (pV < (cV.length * 0.25)) {
            return Math.ceil(cV.length * 0.25);
        }
        return pV;
    }, 1);

    request.esClient.search({
        index: 'issues',
        body: {
            size: 20,
            from: (page - 1) * 20,
            query: {
                multi_match: {
                    query: query,
                    fields: ['solutions', 'symptom'],
                    minimum_should_match: 1,
                    fuzziness: fuzziness,
                }
            },
        }
    }).then(
        // tslint:disable-next-line:no-anything
        (result: any) => {
            console.log(result);
            response.json(result.hits);
        }
    ).catch(
        (result: any) => {
            console.error(result);
            response.status(result.status).json(result);
        }
    );
};

users.route('/')
    .get(get);

export default users;
