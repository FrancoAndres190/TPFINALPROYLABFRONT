import type { ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { isLoggedIn, roles } = useAuth();

  if (!isLoggedIn) {
    // Si no está logueado → al login
    return <Navigate to="/login" replace />;
  }

  const hasAccess = roles.some((role) => allowedRoles?.includes(role));

  if (!hasAccess) {
    // Si está logueado pero no tiene el rol → a home
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
