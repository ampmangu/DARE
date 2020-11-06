const axios = require('axios');
const config = require('config');

const host = config.get('dare_url');
const clientid = config.get('client_id');
const clientsecret = config.get('client_secret');

async function getToken() {
  const promise = await axios.post(`${host}/api/login`, {
    client_id: clientid,
    client_secret: clientsecret,
  });
  return promise.data;
}

module.exports = getToken;
