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

async function getPolicies() {
  let token = {};
  await (async () => {
    token = await getToken();
  })();
  return getPoliciesFromServer(token.token);
}
module.exports = getPolicies;
