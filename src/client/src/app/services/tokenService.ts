import { AccessToken } from "../models/accessToken";

const getToken = (): string => {
  const token = getTokenFromStorage();
  return token ? token.token : "";
};

const setToken = (token: string): void => {
  if (token) localStorage.setItem("token", token);
};

const tokenValid = (): boolean => {
  const token = getTokenFromStorage();
  if (!token) return false;

  const validUntil = new Date(token.validUntil);
  const currentDate = new Date();
  return currentDate < validUntil;
};

const TokenService = {
  getToken,
  setToken,
  tokenValid,
};

export default TokenService;

// private
const getTokenFromStorage = (): AccessToken | null => {
  const token = localStorage.getItem("token");
  return token ? (JSON.parse(token) as AccessToken) : null;
};
