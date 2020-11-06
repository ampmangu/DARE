const axios = require('axios');
const config = require('config');
const getToken = require('./LoginService');

const host = config.get('dare_url');

async function getClientsFromServer(token) {
  const requestConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const promise = await axios.get(`${host}/api/clients`, requestConfig).catch((error) => {
    throw error;
  });
  return promise.data;
}

async function getClients(res, next) {
  let token = {};
  await (async () => {
    token = await getToken(res, next);
  })();
  return getClientsFromServer(token.token);
}

module.exports = getClients;
