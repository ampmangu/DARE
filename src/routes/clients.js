const express = require('express');

const router = express.Router();
const axios = require('axios');
const config = require('config');
const login = require('./login');
const policies = require('./policies');

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
    token = await login.getToken(res, next);
  })();
  return getClientsFromServer(token.token);
}

router.get('/', async (req, res, next) => {
  const clients = await getClients(res, next);
  res.send(clients);
});

router.get('/:id', async (req, res, next) => {
  const clients = await getClients(res, next);
  const { id } = req.params;
  const filtered = clients.filter((client) => client.id === id);
  res.send(filtered);
});

router.get('/:id/policies', async (req, res, next) => {
  const { id } = req.params;
  let allPolicies = {};
  await (async () => {
    allPolicies = await policies.getPolicies(res, next);
  })();
  const policiesFromClient = allPolicies.filter((policy) => policy.clientId === id);
  res.send(policiesFromClient);
});
module.exports = router;
