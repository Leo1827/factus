import axios from "axios";
import { getAuth, isTokenExpired, clearAuth } from "../../shared/storage/tokenStorage";
import { refreshToken } from "../../features/auth/services/factusAuth";

const api = axios.create({
  baseURL: import.meta.env.VITE_FACTUS_BASE_URL,
});

let isRefreshing = false;
let queue = [];

// interceptor request

api.interceptors.request.use(async (config) => {
  // NO interceptar llamadas al OAuth
  if (config.url?.includes("/oauth/token")) {
    return config;
  }

  let auth = getAuth();

  // si el token expiró > intentar refresh
  if (auth && isTokenExpired()) {
    try {
      if (!isRefreshing) {
        isRefreshing = true;
        auth = await refreshToken();
        isRefreshing = false;

        queue.forEach((cb) => cb(auth.access_token));
        queue = [];
      } else {
        return new Promise((resolve) => {
          queue.push((token) => {
            config.headers.Authorization = `Bearer ${token}`;
            resolve(config);
          });
        });
      }
    } catch (error) {
      clearAuth();
      window.location.href = "/login";
      return Promise.reject(error);
    }
  }

  // agregar token a la request
  if (auth?.access_token) {
    config.headers.Authorization = `Bearer ${auth.access_token}`;
  }

  return config;
});

export default api;