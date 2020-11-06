const axios = require('axios');
const config = require('config');

const host = config.get('dare_url');
const getToken = require('./LoginService');

async function getPoliciesFromServer(token) {
  const requestconfig = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const promise = await axios.get(`${host}/api/policies`, requestconfig).catch((error) => {
    throw error;
  });
  return promise.data;
}

async function getPolicies(res, next) {
  let token = {};
  await (async () => {
    token = await getToken(res, next);
  })();
  return getPoliciesFromServer(token.token);
}
module.exports = getPolicies;
