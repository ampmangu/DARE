const express = require('express');

const router = express.Router();

const getClients = require('../service/ClientService');
const getPolicies = require('../service/PolicyService');

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
    allPolicies = await getPolicies(res, next);
  })();
  const policiesFromClient = allPolicies.filter((policy) => policy.clientId === id);
  res.send(policiesFromClient);
});
module.exports = router;
