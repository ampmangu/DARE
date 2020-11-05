const express = require('express');

const router = express.Router();
const axios = require('axios');
const config = require('config');
const login = require('./login');
const policies = require('./policies');

const mode = process.env.NODE_ENV || 'dev';
const host = config.get(`${mode}.dare_url`);

async function getClientsFromServer(token) {
  const requestConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const promise = await axios.get(`${host}/api/clients`, requestConfig).catch((error) => {
    throw error;
  });
  return promise.data;
}

async function getToken(res, next) {
  return login.getToken(res, next);
}

async function getClients(res, next) {
  const token = await getToken(res, next);
  return getClientsFromServer(token.token);
}

async function getPolicies(res, next) {
  return policies.getPolicies(res, next);
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
  const allPolicies = await getPolicies(res, next);
  const policiesFromClient = allPolicies.filter((policy) => policy.clientId === id);
  res.send(policiesFromClient);
});
module.exports = router;
