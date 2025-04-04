import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import Loading from "../ui/loading";

const ProtectedRoutes = () => {
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default ProtectedRoutes;
