import axios, { AxiosResponse } from "axios";

import { AccessToken } from "../models/accessToken";
import { PlaylistData } from "../models/playlistData";
import TokenService from "../services/tokenService";

axios.defaults.baseURL = "https://localhost:44381";

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use((config) => {
  if (TokenService.tokenValid() && config.headers) {
    const token = TokenService.getToken();
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    // Refresh token
    // If that one is invalid, redirect to login?
  }
  return config;
});

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Auth = {
  login: () => requests.get<string>("/auth/login"),
  token: (token: string) => requests.get<AccessToken>(`/auth/token/${token}`),
};

const Playlists = {
  get: () => requests.get<PlaylistData>(`/playlist`),
};

const agent = {
  Auth,
  Playlists,
};

export default agent;
