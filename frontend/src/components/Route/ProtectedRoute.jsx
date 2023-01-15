import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

export default function ProtectedRoute({
  isAuthenticated,
  children,
  adminRoute,
  superAdmin,
  isAdmin,
  redirect = "/login",
  redirectAdmin = "/orders",
}) {
  if (!isAuthenticated) {
    return <Navigate to={redirect} />;
  }
  if (adminRoute && !isAdmin) {
    return <Navigate to={redirect} />;
  }
  if (superAdmin && !isAdmin) {
    toast.info("you have no rights to access this resource");
    return <Navigate to={redirectAdmin} />;
  }
  return children ? children : <Outlet />;
}
