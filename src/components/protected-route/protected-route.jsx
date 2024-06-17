import { useSelector } from 'react-redux';

import { Navigate, useLocation } from 'react-router-dom';

import { getIsAuth, getUser } from '../../services/slices/auth';
import { URL_FORGOT_PASSWORD, URL_HOME, URL_LOGIN, URL_RESET_PASSWORD } from '../../utils/routes';
import Preloader from '../preloader/preloader';

const ProtectedRoute = ({ onlyUnAuth = false, component }) => {
  const isAuth = useSelector(getIsAuth);
  const user = useSelector(getUser);

  const location = useLocation();

  if (!isAuth) return <Preloader />;

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: URL_HOME };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) return <Navigate to={URL_LOGIN} state={{ from: location }} />;

  if (location.pathname === URL_RESET_PASSWORD && !localStorage.getItem('ResetPassword')) {
    return <Navigate to={URL_FORGOT_PASSWORD} />;
  }

  return component;
};

export const OnlyAuthRoute = ProtectedRoute;
export const OnlyUnAuthRoute = ({ component }) => <ProtectedRoute onlyUnAuth={true} component={component} />;
