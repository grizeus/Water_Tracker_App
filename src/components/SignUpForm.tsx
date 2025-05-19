import { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import PasswordStrengthBar from "react-password-strength-bar";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";

import { ContentLoader } from "./common/Loader/Loader";
import { signUpThunk } from "../redux/auth/operations";
import { selectIsLoading } from "../redux/root/selectors";
import { AppDispatch } from "../redux/store";
import { FcHighPriority, FcOk } from "react-icons/fc";
import { emailRegExp } from "../helpers/utils/constants";
import sprite from "../assets/images/sprite/sprite.svg"

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .matches(emailRegExp, "Email is not valid")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Your password is too short.")
    .matches(/[a-zA-Z]/, "Password should contain at least one Latin letters."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Password must match!")
    .required("Confirm password is reqired!"),
});

const INITIAL_VALUES = { email: "", password: "", confirmPassword: "" };

export const SignUpForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(selectIsLoading);

  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  return (
    <div className="flex flex-col items-center gap-[66px] md:flex-row md:items-start md:gap-0 xl:justify-end">
      <div className="flex w-[280px] flex-col gap-4 text-charcoal md:w-[336px] xl:w-[384px]">
        <h1 className="text-[26px] font-medium leading-8">Sign Up</h1>
        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={validationSchema}
          onSubmit={({ email, password }) => {
            void dispatch(signUpThunk({ email, password }));
          }}>
          {({ errors, isValid, touched, values }) => (
            <Form className="flex flex-col gap-5">
              <label className="relative flex w-full flex-col gap-2 text-lg leading-6">
                Enter your email
                <Field
                  className={` ${errors.email && touched.email && "border-sunset text-sunset"} flex items-center rounded-md border border-hawkes px-[10px] py-3 text-perano placeholder:text-perano focus:text-royal focus:outline-none`}
                  type="email"
                  name="email"
                  placeholder="E-mail"
                />
                <ErrorMessage
                  name="email"
                  component="span"
                  className="text-sunset"
                />
                {errors.email && values.email && (
                  <FcHighPriority className="absolute right-2.5 top-12 size-4" />
                )}
                {!errors.email && values.email && (
                  <FcOk className="absolute right-2.5 top-12 size-4" />
                )}
              </label>

              <label className="relative flex w-full flex-col gap-2 text-lg leading-6">
                Enter your password
                <Field
                  className={` ${errors.password && touched.password && "border-sunset text-sunset"} flex items-center rounded-md border border-hawkes px-[10px] py-3 text-base leading-5 text-perano placeholder:text-base placeholder:leading-5 placeholder:text-perano focus:text-royal focus:outline-none`}
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                />
                <ErrorMessage
                  name="password"
                  component="span"
                  className="text-sunset"
                />
                <svg
                  className="absolute right-2.5 top-12 size-4 fill-transparent stroke-royal"
                  onClick={() => setPasswordVisible(!isPasswordVisible)}>
                  <use
                    href={`${sprite}#${
                      isPasswordVisible ? "icon-to-open" : "icon-to-hide"
                    }`}></use>
                </svg>
                <PasswordStrengthBar
                  style={{ height: "5px" }}
                  scoreWordStyle={{ margin: "0" }}
                  password={values.password}
                  minLength={8}
                />
              </label>

              <label className="relative flex w-full flex-col gap-2 text-lg leading-6">
                Repeat Password
                <Field
                  className={` ${errors.confirmPassword && touched.confirmPassword && "border-sunset text-sunset"} flex items-center rounded-md border border-hawkes px-[10px] py-3 text-base leading-5 text-perano placeholder:text-base placeholder:leading-5 placeholder:text-perano focus:text-royal focus:outline-none`}
                  type={isConfirmPasswordVisible ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Repeat password"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="span"
                  className="text-sunset"
                />
                <svg
                  className="absolute right-2.5 top-12 size-4 fill-transparent stroke-royal"
                  onClick={() =>
                    setConfirmPasswordVisible(!isConfirmPasswordVisible)
                  }>
                  <use
                    href={`${sprite}#${
                      isConfirmPasswordVisible ? "icon-to-open" : "icon-to-hide"
                    }`}></use>
                </svg>
                <PasswordStrengthBar
                  password={values.confirmPassword}
                  scoreWordStyle={{ margin: "0" }}
                />
              </label>

              <button
                className={`${!isValid ? "cursor-not-allowed bg-perano shadow-none" : "bg-royal"} flex w-full items-center justify-center rounded-[10px] px-[30px] py-2 text-white shadow-sm transition-shadow duration-300 ease-in-out hover:shadow-lg md:py-[10px]`}
                type="submit">
                Sign Up {isLoading && <ContentLoader />}
              </button>
            </Form>
          )}
        </Formik>
        <NavLink
          className="text-base leading-5 text-royal transition-colors duration-300 ease-in-out hover:text-sunshade"
          to="/signin">
          Sign In
        </NavLink>
      </div>
    </div>
  );
};
