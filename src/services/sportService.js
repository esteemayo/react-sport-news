import http from './httpService';

const apiEndpoint = '/sports';

const sportUrl = (sportId) => {
  return `${apiEndpoint}/${sportId}`;
};

export const getSports = (page) => http.get(`${apiEndpoint}?page=${page}`);

export const searchSport = (query) =>
  http.get(`${apiEndpoint}/search?searchQuery=${query}`);

export const getUserSports = () => http.get(`${apiEndpoint}/user-sports`);

export const getSportById = (sportId) => http.get(sportUrl(sportId));

export const getSportBySlug = (slug) =>
  http.get(`${apiEndpoint}/details/${slug}`);

export const createSport = (sport) => http.post(apiEndpoint, sport);

export const updateSport = (sportId, sport) =>
  http.patch(sportUrl(sportId), sport);

export const deleteSport = (sportId) => http.delete(sportUrl(sportId));
