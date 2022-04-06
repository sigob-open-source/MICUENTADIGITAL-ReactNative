// Axios main config
import axios from 'axios';

import { store } from '../store';
import { dispatchClearAuth, dispatchSetToken } from '../store/actions/auth';
import { navigateWithReset } from '../types/navigation';

// Configuration
export const API_SCHEMA = 'https';
export const API_HOST = 'apigrp.migob.mx/';
export const API_PATH = '';

export const httpConfig = {
  baseURL: `${API_SCHEMA}://${API_HOST}${API_PATH}`,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': 'es',
  },
};

export const HTTP = axios.create(httpConfig);

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

// Resgister axios hooks
HTTP.interceptors.request.use(onSendRequest, null);
HTTP.interceptors.response.use(null, onResponseFail);

export default HTTP;