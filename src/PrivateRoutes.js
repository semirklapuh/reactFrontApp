import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = (props) => {
  let auth = { token: localStorage.getItem("isAuthenticated") };
  return auth.token ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
