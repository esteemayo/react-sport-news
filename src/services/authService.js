import http from './httpService';
import { getFromStorage } from 'utils';

const apiEndpoint = '/auth';
const tokenKey = 'jwtToken';

export const login = (credentials) =>
  http.post(`${apiEndpoint}/login`, credentials);

export const getJwt = () => getFromStorage(tokenKey)?.token;
