const config = require('config');
const axios = require('../remote/axiosConfig');

const clientid = config.get('client_id');
const clientsecret = config.get('client_secret');

async function getToken() {
  const requestConfig = {
    method: 'post',
    url: '/api/login',
    data: {
      client_id: clientid,
      client_secret: clientsecret,
    },
  };
  const promise = await axios.request(requestConfig);
  return promise.data;
}

module.exports = getToken;
