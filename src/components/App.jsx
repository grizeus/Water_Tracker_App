import { Loader } from 'components';
import { lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import RestrictedRoute from './RestrictedRoute';

import { useDispatch, useSelector } from 'react-redux';

const WelcomePage = lazy(() => import('../pages/Welcome/Welcome'));
const HomePage = lazy(() => import('../pages/Home/Home'));
const SigninPage = lazy(() => import('../pages/SignIn/SignIn'));
const SignUpPage = lazy(() => import('../pages/SignUp/SignUp'));
const ErrorPage = lazy(() => import('../pages/Error/Error'));
const ForgotPassPage = lazy(() =>
  import('../pages/ForgotPasswordPage/ForgotPassword'),
);
const ResetPassPage = lazy(() =>
  import('../pages/ResetPasswordPage/ResetPassword'),
);

const App = () => {};

export default App;
