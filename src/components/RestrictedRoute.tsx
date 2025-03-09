import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';

import { selectIsLoggedIn } from '../redux/auth/selectors';

const RestrictedRoute = ({
  component,
  redirectTo,
}: {
  component: ReactNode;
  redirectTo: string;
}) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? <Navigate to={redirectTo} /> : component;
};

export default RestrictedRoute;
