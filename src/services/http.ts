/* @ts-nocheck */
/* eslint-disable no-param-reassign */
// Axios main config
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

// Configuration
export const API_SCHEMA = 'https';
export const API_HOST = 'api.micuenta.digital';
// export const API_LOCALHOST_GRP = '10.0.2.2:8000';
// prod jrz
export const API_HOST_GRP = 'apiexterna.juarez.gob.mx';
// export const API_HOST_GRP = 'apiingresos.migob.mx';

// export const API_HOST_GRP = 'apiingresosnayarit.migob.mx';//
// export const API_HOST_GRP = 'apigrp.migob.mx';
export const API_PATH = '/';
const headers = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  'Content-Type': 'application/json',
  // eslint-disable-next-line @typescript-eslint/naming-convention
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

const onResponseFail = async (error: AxiosError) => {
  const statusCode = error?.response?.status;

  if (statusCode === 502 || error.code === 'ERR_NETWORK') {
    return axios.request(error.config as AxiosRequestConfig);
  }

  return Promise.reject(error);
};

// Register axios hooks
HTTP_MI_CUENTA.interceptors.response.use(null, onResponseFail);

export const HTTP = HTTP_MI_CUENTA;

export default HTTP_GRP;
