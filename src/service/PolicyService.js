const axios = require('../remote/axiosConfig');

const getToken = require('./LoginService');

async function getPoliciesFromServer(token) {
  const requestConfig = {
    url: '/api/policies',
    method: 'get',
    headers: { Authorization: `Bearer ${token}` },
  };
  const promise = await axios.request(requestConfig);
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
