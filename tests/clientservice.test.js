/* eslint-env jest */
const axios = require('../src/remote/axiosConfig');

const getClients = require('../src/service/ClientService');

jest.mock('../src/remote/axiosConfig', () => ({
  baseUrl: 'localhost:3000',
  request: jest.fn().mockResolvedValue({
    data: [
      {
        id: 'a0ece5db-cd14-4f21-812f-966633e7be86',
        name: 'Britney',
        email: 'britneyblankenship@quotezart.com',
        role: 'admin',
      },
      {
        id: 'e8fd159b-57c4-4d36-9bd7-a59ca13057bb',
        name: 'Manning',
        email: 'manningblankenship@quotezart.com',
        role: 'admin',
      },
      {
        id: 'a3b8d425-2b60-4ad7-becc-bedf2ef860bd',
        name: 'Barnett',
        email: 'barnettblankenship@quotezart.com',
        role: 'user',
      },
    ],
  }),
}));
describe('Test get all clients', () => {
  afterEach(() => jest.resetAllMocks());

  it('Fetches clients', async () => {
    const clients = await getClients();
    expect(axios.request).toHaveBeenCalledTimes(2);
    const args = { method: 'get', url: '/api/clients', headers: { Authorization: 'Bearer undefined' } };
    expect(axios.request).lastCalledWith(args);
    expect(clients.length).toBe(3);
  });
});
