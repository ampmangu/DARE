const express = require('express');

const router = express.Router();
const getToken = require('../service/LoginService');

router.post('/', (req, res, next) => {
  getToken(res, next)
    .then((data) => {
      res.send(data);
    });
});

module.exports = router;
