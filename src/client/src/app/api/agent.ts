import axios, { AxiosResponse } from "axios";

import { AccessToken } from "../models/accessToken";
import { AddTracksRequest } from "../models/addTracksRequest";
import { Library } from "../models/library";
import { PlaylistTracks } from "../models/playlistTracks";
import { SearchRequest } from "../models/searchRequest";
import { SearchTracksSummary } from "../models/searchTracksSummary";
import TokenService from "../services/tokenService";

axios.defaults.baseURL = "https://localhost:44381";

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use((config) => {
  if (TokenService.tokenValid() && config.headers) {
    const token = TokenService.getToken();
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.log("Token not valid");
    // TODO: Refresh token: if that one is invalid, redirect to login?
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
  get: () => requests.get<Library>(`/playlist`),
  getTracksByPlaylistId: (id: string) => requests.get<PlaylistTracks>(`/playlist/${id}/tracks`),
  add: (req: AddTracksRequest) => requests.post(`/playlist/add`, req),
  search: (req: SearchRequest) => requests.post<SearchTracksSummary>(`/playlist/search`, req),
};

const agent = {
  Auth,
  Playlists,
};

export default agent;
