import api from "../../../shared/api/axiosClient";
import { getAuth, saveAuth } from "../../../shared/storage/tokenStorage";

// URL base de la api
const BASE = import.meta.env.VITE_FACTUS_BASE_URL;

// funcion para autenticarse contra factus
export const login = async ({ username, password }) => {
  try {
    // Crear URLSearchParams para enviar como form-data
    // application/x-www-form-urlencoded
    const params = new URLSearchParams();

    params.append("grant_type", "password");
    params.append("client_id", import.meta.env.VITE_FACTUS_CLIENT_ID);
    params.append("client_secret", import.meta.env.VITE_FACTUS_CLIENT_SECRET);
    params.append("username", username);
    params.append("password", password);

    // Petición POST al endpoint OAuth
    const response = await api.post(`${BASE}/oauth/token`, params, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    saveAuth(response.data); // Guardar access y refresh token

    return response.data;
  } catch (error) {
    
    console.error("FACTUS ERROR:", error.response?.data);
    throw error;
  }
};

// refrescar access token: refresh_token
export const refreshToken = async () => {
  const auth = getAuth();

  if (!auth?.refresh_token){
    throw new Error("No refresh token available");
  }

  const params = new URLSearchParams();
  params.append("grant_type", "refresh_token");
  params.append("client_id", import.meta.env.VITE_FACTUS_CLIENT_ID);
  params.append("client_secret", import.meta.env.VITE_FACTUS_CLIENT_SECRET);
  params.append("refresh_token", auth.refresh_token);

  const response = await api.post(`${BASE}/oauth/token`, params, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  saveAuth(response.data);
  return response.data;

};