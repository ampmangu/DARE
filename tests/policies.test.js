/* eslint-env jest */
const fs = require('fs');
const nock = require('nock');
const config = require('config');

const mockTokenJson = JSON.parse(fs.readFileSync(`${process.cwd()}/tests/json/token.json`));
const host = config.get('dare_url');
const request = require('supertest');
const app = require('../app');

describe('Policy routes', () => {
  beforeEach(() => {
    nock(host)
      .post('/api/login')
      .reply(200, mockTokenJson);
    jest.mock('../src/service/LoginService', () => jest.fn((req, res, next) => (mockTokenJson)));
  });
  afterEach(() => jest.resetAllMocks());
  it('should get all policies', async () => {
    const mockPoliciesJson = JSON.parse(fs.readFileSync(`${process.cwd()}/tests/json/policies.json`));
    jest.mock('../src/service/PolicyService', () => jest.fn((req, res, next) => (mockPoliciesJson)));
    nock(host)
      .get('/api/policies')
      .reply(200, mockPoliciesJson);
    const res = await request(app).get('/policies');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(mockPoliciesJson.length);
    expect(res.body).toEqual(mockPoliciesJson);
  });
  it('should get a policy by id', async () => {
    const mockClientJson = JSON.parse(fs.readFileSync(`${process.cwd()}/tests/json/policies.json`));
    jest.mock('../src/service/PolicyService',
      () => jest.fn(() => (mockClientJson)));
    nock(host)
      .get('/api/policies')
      .reply(200, mockClientJson);
    const res = await request(app)
      .get('/policies/64cceef9-3a01-49ae-a23b-3761b604800b');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(1);
  });
});
