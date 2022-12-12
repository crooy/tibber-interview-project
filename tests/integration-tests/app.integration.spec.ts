import 'jest';
import express from 'express';
import {
    StatusCodes,
} from 'http-status-codes';
import request from 'supertest';
import IntegrationHelpers from '../helpers/Integration-helpers';

describe('status integration tests', () => {
    let app: express.Application;

    beforeAll(async() => {
        app = await IntegrationHelpers.getApp();
    });


    it('can get default route success', async () => {
        await request(app)
            .get('/tibber-developer-test')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect((res: request.Response) => {
                // eslint-disable-next-line no-console
                console.log(res.text);
            })
            .expect(StatusCodes.OK);
    });

    it('can post commands', async () => {
        const given = {
            start: {
                x: -10, y: -10
            },
            commands: [{
                direction: 'north',
                steps: 10
            }, {
                direction: 'east',
                steps: 10
            }, {
                direction: 'west',
                steps: 10
            }, {
                direction: 'south',
                steps: 10
            }]
        };

        await request(app)
            .post('/tibber-developer-test/enter-path')
            .set('Accept', 'application/json')
            .send(given)

            .expect(StatusCodes.OK)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect((res: request.Response) => {

                expect(res.body.record.result).toBe(3);
                expect(res.body.record.commands).toBe(4);

                // eslint-disable-next-line no-console
                console.log(res.text);
            });
    });
});
