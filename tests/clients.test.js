/* eslint-env jest */
const fs = require('fs');
const nock = require('nock');
const config = require('config');

const mockTokenJson = JSON.parse(fs.readFileSync(`${process.cwd()}/tests/json/token.json`));
const host = config.get('dare_url');
const request = require('supertest');
const app = require('../app');

describe('Client routes', () => {
  beforeEach(() => {
    nock(host)
      .post('/api/login')
      .reply(200, mockTokenJson);
    jest.mock('../src/service/LoginService', () => jest.fn((req, res, next) => (mockTokenJson)));
  });
  afterEach(() => jest.resetAllMocks());
  it('should get all clients', async () => {
    const mockClientJson = JSON.parse(fs.readFileSync(`${process.cwd()}/tests/json/clients.json`));
    jest.mock('../src/service/ClientService', () => jest.fn((req, res, next) => (mockClientJson)));
    nock(host)
      .get('/api/clients')
      .reply(200, mockClientJson);
    const res = await request(app).get('/clients');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(mockClientJson.length);
    expect(res.body).toEqual(mockClientJson);
  });
  it('should get a client by id', async () => {
    const mockClientJson = JSON.parse(fs.readFileSync(`${process.cwd()}/tests/json/clients.json`));
    jest.mock('../src/service/ClientService',
      () => jest.fn(() => (mockClientJson)));
    nock(host)
      .get('/api/clients')
      .reply(200, mockClientJson);
    const res = await request(app)
      .get('/clients/a0ece5db-cd14-4f21-812f-966633e7be86');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(1);
  });
  it('should get a policy of a client by id of client', async () => {
    const mockPolicyJson = JSON.parse(fs.readFileSync(`${process.cwd()}/tests/json/policyById.json`));
    jest.mock('../src/service/PolicyService',
      () => jest.fn(() => (mockPolicyJson)));
    nock(host)
      .get('/api/policies')
      .reply(200, mockPolicyJson);
    const res = await request(app)
      .get('/clients/a0ece5db-cd14-4f21-812f-966633e7be86/policies');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(1);
    expect(res.body).toEqual(mockPolicyJson);
  });
});
