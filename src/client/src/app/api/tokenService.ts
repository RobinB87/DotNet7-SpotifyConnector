const setToken = (token: string) => {
  if (token) localStorage.setItem("token", token);
};

const TokenService = {
  setToken,
};

export default TokenService;
