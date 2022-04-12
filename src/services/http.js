/* eslint-disable no-param-reassign */
// Axios main config
import axios from 'axios';

import { store } from '../store';
import { dispatchClearAuth, dispatchSetToken } from '../store/actions/auth';
import { navigateWithReset } from '../utils/navigation';

// Configuration
export const API_SCHEMA = 'https';
export const API_HOST = 'api.micuenta.digital';
// export const API_LOCALHOST_GRP = '10.0.2.2:8000';
export const API_HOST_GRP = 'apigrp.migob.mx';
export const API_PATH = '/';
const headers = {
  'Content-Type': 'application/json',
  'Accept-Language': 'es',
  Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQ5NzIwMjc0LCJqdGkiOiJjOGY5MGE2MzI3NWY0MGM1YmRhMDcwMmZmYzU0OWRiZSIsInN1YiI6NiwibmFtZSI6IlBhb2xvIFBheWFuIiwiZW1haWwiOiJwYW9sby5wYXlhbkBuYXlhcml0LmNvbS5teCIsImVudGlkYWQiOjF9.ooRx5vrn5A6T0Kfbbw5dYpPfBFZcxE1LrN4ubAxHj0SNLRQDQK8t2O6zgRa07E5S3KYZJLUv4qRbK_hdHXNnr8jaOpaa-uQWk-U6FnFnyVVzu3V8zFKm8RbLu5KieV5yfJJi8jSTSKDTooLN25SbsVrqFVYPENVarCiIKAMyQP9EIt8l0UHz1THhYHhzc6ZtUW38qCD_Eb8kZs5aEdc7wo10rsuOvrKPyUgDvxijMSQsh2qidSDVLjh7HoTHZpqUGKMems7V6D8C_7RjaGcSPQs-lW9cv8QTuTF3OmcYVVuzt6kBj7ca2hVeTilPEFauk5c7hhxJUHomNpzvOMOHX4vhJI4Pa_CGrKj_2CDbESEHB0lfmxZq_8DfU1nCkWIQH4UMij9Jc_m0-YTluky2-tikh9k3FQ_dD0yO7TnxPoM9jUtKuwMtEePeAFUmrlK3W3I3XBDGZrAqbcC3OBNZxB3SY8otfAPoWvtT63M0WSADHNzVXI8UnVouW_xu0A-i9XCtbTBIfVtu1hZ9YV2qxYM1KWbOUoDeFyUeLC0MIA4d9qwfnX7UnuJboj6bhBockxCSO4BxQDuxJIl43Z0ZaWTL3odssfnyzCeujUj4zXevMof_77RqnBqQqwAu1i0q-xXo0fqFEsA3oJf7XTvJPlbkMCAdJsUZa7VbSuLm67M',
};

export const httpConfigGRP = {
  baseURL: `${API_SCHEMA}://${API_HOST_GRP}${API_PATH}`,
  // baseURL: `http://${API_LOCALHOST_GRP}${API_PATH}`,
  headers,
};

export const httpConfig = {
  baseURL: `${API_SCHEMA}://${API_HOST}${API_PATH}`,
  headers,
};

// Axios instances
const HTTP_GRP = axios.create(httpConfigGRP);
const HTTP_MI_CUENTA = axios.create(httpConfig);

// Interceptors
const onSendRequest = (config) => {
  const token = store.getState()?.auth?.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

const refreshToken = async (token) => {
  try {
    const response = await axios.post(
      `${httpConfig.baseURL}usuarios/refresh-token/`,
      {
        refresh: token,
      },
    );
    return response?.data?.access;
  } catch (error) {
    console.error(error);
  }
  return null;
};

const onResponseFail = async (error) => {
  const statusCode = error?.response?.status;
  const data = error?.response?.data;

  // If token fails try to refresh it
  if (
    statusCode === 401
    && (/autenticación/gi.test(data?.detail) || data?.code === 'token_not_valid')
  ) {
    const refresh = store.getState()?.auth?.refreshToken;

    if (refresh) {
      const newToken = await refreshToken(refresh);

      if (newToken) {
        dispatchSetToken(store.dispatch, newToken);
        const { config } = error;
        config.headers.Authorization = `Bearer ${newToken}`;
        return axios.request(config);
      }
      // If token fails redirect user to login screen
      dispatchClearAuth(store.dispatch);
      return navigateWithReset('auth');
    }
  }

  return Promise.reject(error);
};

// Register axios hooks
HTTP_MI_CUENTA.interceptors.request.use(onSendRequest, null);
HTTP_MI_CUENTA.interceptors.response.use(null, onResponseFail);

export const HTTP = HTTP_MI_CUENTA;

export default HTTP_GRP;
