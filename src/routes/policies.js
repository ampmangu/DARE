const express = require('express');

const router = express.Router();
const axios = require('axios');
const config = require('config');
const getToken = require('../service/LoginService');

const host = config.get('dare_url');

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

router.get('/', async (req, res, next) => {
  const policies = await getPolicies(res, next);
  res.send(policies);
});

router.get('/:id', async (req, res, next) => {
  const policies = await getPolicies(res, next);
  const { id } = req.params;
  const filtered = policies.filter((policy) => policy.id === id);
  res.send(filtered);
});

module.exports = {
  router,
  getPolicies,
};
