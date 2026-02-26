import { Navigate } from "react-router-dom";
import { getAuth, isTokenExpired } from "../storage/tokenStorage";

export default function PrivateRoute({ children }) {
  const auth = getAuth();

  // no hay sesión
  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  // token expirado
  if (isTokenExpired()) {
    return <Navigate to="/login" replace />;
  }

  // todo bien
  return children;
}