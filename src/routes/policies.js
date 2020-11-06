const express = require('express');

const router = express.Router();
const getPoliciesFromServer = require('../service/PolicyService');

router.get('/', async (req, res, next) => {
  const policies = await getPoliciesFromServer(res, next);
  res.send(policies);
});

router.get('/:id', async (req, res, next) => {
  const policies = await getPoliciesFromServer(res, next);
  const { id } = req.params;
  const filtered = policies.filter((policy) => policy.id === id);
  res.send(filtered);
});

module.exports = router;
