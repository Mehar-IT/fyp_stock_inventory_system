import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({
  isAuthenticated,
  children,
  adminRoute,
  superAdmin,
  isAdmin,
  redirect = "/login",
  redirectAdmin = "/dashboard",
}) {
  if (!isAuthenticated) {
    return <Navigate to={redirect} />;
  }
  if (adminRoute && !isAdmin) {
    return <Navigate to={redirect} />;
  }
  if (superAdmin && !isAdmin) {
    return <Navigate to={redirectAdmin} />;
  }
  return children ? children : <Outlet />;
}
