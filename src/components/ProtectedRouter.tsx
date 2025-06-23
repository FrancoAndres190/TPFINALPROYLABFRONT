import type { ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";
import Loader from "./Loader";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { isLoggedIn, roles, initializing } = useAuth();

  if (initializing) {
    // Mostrar loader mientras carga el token/roles
    return <Loader />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  const hasAccess =
    !allowedRoles || roles.some((role) => allowedRoles.includes(role));

  if (!hasAccess) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
