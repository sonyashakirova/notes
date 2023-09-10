import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "features";
import { Loading } from "shared/ui";

export function PrivateRoute() {
  const { user } = useAuth();

  return typeof user === "undefined" ? (
    <Loading />
  ) : user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
}
