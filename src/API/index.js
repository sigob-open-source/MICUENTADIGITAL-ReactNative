const axios = require('axios');

const timeout = 30000;
const baseURL = 'http://192.168.0.222:2000/';

export const config = {
  timeout,
  baseURL,
};

exports.config = config;

const http = axios.create({
  ...config,
});

export default http;
