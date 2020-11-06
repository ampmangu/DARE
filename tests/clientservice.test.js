/* eslint-env jest */
const axios = require('../src/remote/axiosConfig');

const getClients = require('../src/service/ClientService');

jest.mock('../src/remote/axiosConfig', () => ({
  baseUrl: 'localhost:3000',
  request: jest.fn().mockResolvedValue({
    data: [
      {
        id: '64cceef9-3a01-49ae-a23b-3761b604800b',
        amountInsured: '1825.89',
        email: 'inesblankenship@quotezart.com',
        inceptionDate: '2016-06-01T03:33:32Z',
        installmentPayment: true,
        clientId: 'e8fd159b-57c4-4d36-9bd7-a59ca13057bb',
      },
      {
        id: '7b624ed3-00d5-4c1b-9ab8-c265067ef58b',
        amountInsured: '399.89',
        email: 'inesblankenship@quotezart.com',
        inceptionDate: '2015-07-06T06:55:49Z',
        installmentPayment: true,
        clientId: 'a0ece5db-cd14-4f21-812f-966633e7be86',
      },
      {
        id: '56b415d6-53ee-4481-994f-4bffa47b5239',
        amountInsured: '2301.98',
        email: 'inesblankenship@quotezart.com',
        inceptionDate: '2014-12-01T05:53:13Z',
        installmentPayment: false,
        clientId: 'e8fd159b-57c4-4d36-9bd7-a59ca13057bb',
      },
    ],
  }),
}));
describe('Test get all policies', () => {
  afterEach(() => jest.resetAllMocks());

  it('Fetches policies', async () => {
    const clients = await getClients();
    expect(axios.request).toHaveBeenCalledTimes(2);
    const args = { method: 'get', url: '/api/clients', headers: { Authorization: 'Bearer undefined' } };
    expect(axios.request).lastCalledWith(args);
    expect(clients.length).toBe(3);
  });
});
