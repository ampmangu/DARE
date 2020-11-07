/* eslint-env jest */
const axios = require('../src/remote/axiosConfig');
const getToken = require('../src/service/LoginService');

jest.mock('../src/remote/axiosConfig', () => ({
  baseUrl: 'localhost:3000',
  request: jest.fn().mockResolvedValue({
    data: {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      type: 'Bearer',
    },
  }),
}));
describe('Get token for login', () => {
  afterEach(() => jest.resetAllMocks());
  it('Fetches token', async () => {
    const token = await getToken();
    expect(axios.request).toHaveBeenCalledTimes(1);
    expect(token.type).toBe('Bearer');
    expect(token.token).toBeDefined();
  });
});
