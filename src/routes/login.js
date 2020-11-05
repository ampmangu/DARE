const express = require('express');

const router = express.Router();
const axios = require('axios');
const config = require('config');

const mode = process.env.NODE_ENV || 'dev';
const host = config.get(`${mode}.dare_url`);
const clientid = config.get(`${mode}.client_id`);
const clientsecret = config.get(`${mode}.client_secret`);

async function getToken() {
  const promise = await axios.post(`${host}/api/login`, {
    client_id: clientid,
    client_secret: clientsecret,
  });
  return promise.data;
}

router.post('/', (req, res, next) => {
  getToken(res, next)
    .then((data) => {
      res.send(data);
    });
});

module.exports = {
  router,
  getToken,
};
