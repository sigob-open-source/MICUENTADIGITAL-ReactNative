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