const axios = require('axios');

const timeout = 30000;
const baseURL = 'apigrp.migob.mx/';

export const config = {
  timeout,
  baseURL,
};

exports.config = config;

const http = axios.create({
  ...config,
});

export default http;