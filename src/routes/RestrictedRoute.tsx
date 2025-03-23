import { Navigate } from "react-router-dom";
import { IRouteProps } from "../interfaces/interfaces";
import { selectIsLoggedIn } from "../store/auth/selectors";
import { useAppSelector } from "../store/hooks";

const RestrictedRoute: React.FC<IRouteProps> = ({
  component: Component,
  redirectTo = "/",
}) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return isLoggedIn ? <Navigate to={redirectTo} replace /> : <Component />;
};

export default RestrictedRoute;
