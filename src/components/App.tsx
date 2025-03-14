import { useDispatch, useSelector } from "react-redux";
import { lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import RestrictedRoute from "./RestrictedRoute";
import SharedLayout from "./SharedLayout";
import PrivateRoute from "./PrivateRoute";
import { Loader } from "../components/common/Loader/Loader";
import { selectIsRefreshing } from "../redux/auth/selectors";
import { refreshUserThunk } from "../redux/auth/operations";
import { AppDispatch } from "../redux/store";

const WelcomePage = lazy(() => import("../pages/WelcomePage/WelcomePage"));
const HomePage = lazy(() => import("../pages/Home/Home"));
const SigninPage = lazy(() => import("../pages/SignIn/SignIn"));
const SignUpPage = lazy(() => import("../pages/SignUp/SignUp"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    void dispatch(refreshUserThunk());
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
          element={<PrivateRoute component={<HomePage />} redirectTo={"/"} />}
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
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  ) : (
    <Loader />
  );
};

export default App;
