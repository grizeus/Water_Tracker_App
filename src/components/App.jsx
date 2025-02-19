import { Loader } from "components";
import { lazy, Suspense, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import RestrictedRoute from "./RestrictedRoute";

import { useDispatch, useSelector } from "react-redux";
import { selectIsRefreshing } from "src/redux/auth/selectors.js";
import SharedLayout from "./SharedLayout";
import { refreshUser } from "src/redux/auth/operations.js";

const WelcomePage = lazy(() => import("../pages/WelcomePage/WelcomePage"));
const HomePage = lazy(() => import("../pages/Home/Home"));
const SigninPage = lazy(() => import("../pages/SignIn/SignIn"));
const SignUpPage = lazy(() => import("../pages/SignUp/SignUp"));
const ErrorPage = lazy(() => import("../pages/Error/Error"));

const ResetPassPage = lazy(() =>
  import("../pages/ResetPasswordPage/ResetPassword"),
);

const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return !isRefreshing ? (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route
          path="/"
          element={
            <RestrictedRoute component={<WelcomePage />} redirectTo="/home" />
          }
        />
        <Route
          path="home"
          element={<PrivateRoute component={HomePage} redirectTo={"/"} />}
        />
        <Route
          path="signin"
          element={
            <RestrictedRoute component={<SigninPage />} redirectTo="/home" />
          }
        />
        <Route
          path="signup"
          element={
            <RestrictedRoute component={<SignUpPage />} redirectTo="/home" />
          }
        />
        <Route path="reset-pass" element={<ResetPassPage />} />
      </Route>

      <Route
        path="/404"
        element={
          <Suspense fallback={<Loader />}>
            <ErrorPage />
          </Suspense>
        }
      />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  ) : (
    <Loader />
  );
};

export default App;
