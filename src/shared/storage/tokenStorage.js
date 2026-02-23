const KEY = "factus_auth"; // clave unica del localStorage

// Guarda los tokens y calcula la fecha de expiración
export const saveAuth = (data) => {
  // expires_in viene en segundos → se pasa a milisegundos
  const expiresAt = Date.now() + data.expires_in * 1000;

  localStorage.setItem(
    KEY,
    JSON.stringify({
      ...data,
      expires_at: expiresAt, // timestamp exacto de expiración
    })
  );
};
// Obtiene la sesión guardada
export const getAuth = () => {
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : null;
};

// Elimina la sesión (logout)
export const clearAuth = () => {
  localStorage.removeItem(KEY);
};

// Verifica si el token ya expiró
export const isTokenExpired = () => {
  const auth = getAuth();
  if (!auth) return true;
  return Date.now() >= auth.expires_at;
};