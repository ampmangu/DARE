/* eslint-env jest */
const fs = require('fs');
const nock = require('nock');
const config = require('config');

const mockTokenJson = JSON.parse(fs.readFileSync(`${process.cwd()}/tests/json/token.json`));
const host = config.get('dare_url');
const request = require('supertest');
const app = require('../app');

describe('Testing login endpoint', () => {
  it('Getting 200 on token endpoint', async () => {
    nock(host)
      .post('/api/login')
      .reply(200, mockTokenJson);
    jest.mock('../src/service/LoginService', () => jest.fn(() => (mockTokenJson)));
    const res = await request(app).post('/login');
    expect(res.statusCode).toEqual(200);
    expect(res.body.token).toBeDefined();
  });
});
