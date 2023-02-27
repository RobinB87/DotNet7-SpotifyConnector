import { Navigate, Outlet } from "react-router";

import TokenService from "../services/tokenService";

const PrivateRoutes = (): JSX.Element => {
  return TokenService.tokenValid() ? <Outlet /> : <Navigate to="" />;
};

export default PrivateRoutes;
