/* eslint-env jest */
const request = require('supertest');
const app = require('../app');

describe('Testing main endpoint', () => {
  it('Should just return 200', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body).toStrictEqual({});
  });
});
