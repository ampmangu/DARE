const axios = require('axios');
const config = require('config');

const host = config.get('dare_url');

const axiosInstance = axios.default.create({
  baseURL: `${host}`,
});

module.exports = axiosInstance;
