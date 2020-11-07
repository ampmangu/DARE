const axios = require('../remote/axiosConfig');
const getToken = require('./LoginService');

async function getClientsFromServer(token) {
  const requestConfig = {
    url: '/api/clients',
    method: 'get',
    headers: { Authorization: `Bearer ${token}` },
  };
  const promise = await axios.request(requestConfig);
  return promise.data;
}

async function getClients() {
  let token = {};
  await (async () => {
    token = await getToken();
  })();
  return getClientsFromServer(token.token);
}

module.exports = getClients;
