import { Navigate } from "react-router-dom";
import { getAuth, isTokenExpired } from "../storage/tokenStorage";

export default function PublicRoute({ children }) {
  const auth = getAuth();

  // si hay sesión válida → mandar al dashboard
  if (auth && !isTokenExpired()) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}