const TOKEN_KEY = "token";
export const AUTH_LOGOUT_EVENT = "auth:logout";

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

// attach to every fetch; empty object when logged out
export const authHeaders = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// token expired or invalid: tell AuthContext to log the user out
export const handleUnauthorized = (res) => {
  if (res.status === 401 && getToken()) {
    window.dispatchEvent(new Event(AUTH_LOGOUT_EVENT));
  }
};
