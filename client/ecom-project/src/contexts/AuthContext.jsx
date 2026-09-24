import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_BASE_URL, API_ROUTES, ROUTES } from "../constants/index";
import { postData } from "../utils/postData";
import {
  AUTH_LOGOUT_EVENT,
  authHeaders,
  clearToken,
  getToken,
  setToken,
} from "../utils/auth";

const AuthContext = createContext();

const loginUrl = `${API_BASE_URL}${API_ROUTES.auth.login}`;
const signupUrl = `${API_BASE_URL}${API_ROUTES.auth.signup}`;
const meUrl = `${API_BASE_URL}${API_ROUTES.auth.me}`;

export const AuthProvider = ({ children }) => {
  const [token, setTokenState] = useState(getToken);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const logout = useCallback(() => {
    clearToken();
    setTokenState(null);
    setUser(null);
  }, []);

  // any 401 from a fetch helper fires this event
  useEffect(() => {
    window.addEventListener(AUTH_LOGOUT_EVENT, logout);
    return () => window.removeEventListener(AUTH_LOGOUT_EVENT, logout);
  }, [logout]);

  // on page load (or login) fetch the user behind the saved token
  useEffect(() => {
    if (!token) return;

    (async () => {
      setAuthLoading(true);
      try {
        const res = await fetch(meUrl, { headers: authHeaders() });
        const data = await res.json();
        if (data.success) setUser(data.data.user);
        else logout();
      } catch (error) {
        console.log("Error fetching user : ", error);
      }
      setAuthLoading(false);
    })();
  }, [token, logout]);

  const authenticate = async (url, body) => {
    const { data, error } = await postData(url, body);
    if (error) return { success: false, message: "Network error, try again" };

    if (data.success) {
      setToken(data.data.token);
      setTokenState(data.data.token);
      setUser(data.data.user);
    }
    return data;
  };

  const login = (email, password) =>
    authenticate(loginUrl, { email, password });

  const signup = (form) => authenticate(signupUrl, form);

  // call before any action that needs a logged in user
  const requireAuth = () => {
    if (token) return true;
    toast("Please login first");
    navigate(ROUTES.LOGIN, {
      state: { from: location.pathname + location.search },
    });
    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        authLoading,
        isLoggedIn: !!token,
        login,
        signup,
        logout,
        requireAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
