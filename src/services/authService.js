import http from './httpService';

const apiEndpoint = '/auth';
const tokenKey = 'jwtToken';

export const login = (credentials) =>
  http.post(`${apiEndpoint}/login`, credentials);

export const getJwt = () => JSON.parse(localStorage.getItem(tokenKey))?.token;
