import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import * as Yup from "yup";
import { Formik, ErrorMessage } from "formik";

import sprite from "../../../assets/images/sprite/sprite.svg";

import { ContentLoader } from "src/components/index";
import { signInThunk } from "src/redux/auth/operations";

import { SignInLink } from "./SignInForm.styled";
import {
  BootleImg,
  ErrorSpan,
  ErrorSvg,
  EyeSlashIcon,
  FormContainer,
  FormTitle,
  SignButton,
  SignForm,
  SignStyledInput,
  SignStyledLabel,
  SignUpContainer,
  SuccessSvg,
} from "../../SignUp/SignUpForm/SignUpForm.styled";

import { selectIsLoading } from "src/redux/root/selectors";

const emailRules = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
const validationSchema = Yup.object({
  email: Yup.string("Enter your email")
    .matches(emailRules, "Email is not valid")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Your password is too short."),
});

const initialValues = { email: "", password: "" };

export const SignInForm = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const [iconStatus, setIconStatus] = useState(false);

  const iconClick = () => {
    setIconStatus(!iconStatus);
  };

  const handleLoginSubmit = (values, { setSubmitting, setStatus }) => {
    dispatch(signInThunk(values));

    setSubmitting(false);
  };

  return (
    <SignUpContainer>
      <BootleImg />
      <FormContainer>
        <FormTitle>Sign In</FormTitle>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLoginSubmit}>
          {({ errors, isValid, values, status }) => (
            <SignForm>
              <SignStyledLabel>
                Enter your email
                <SignStyledInput
                  className={errors.email ? "input-with-error" : null}
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  autoComplete="username"
                />
                <ErrorMessage name="email" component={ErrorSpan} />
                {errors.email && values.email && <ErrorSvg />}
                {!errors.email && values.email && <SuccessSvg />}
              </SignStyledLabel>
              <SignStyledLabel>
                Enter your password
                <SignStyledInput
                  className={errors.password ? "input-with-error" : null}
                  type={iconStatus ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  autoComplete="current-password"
                />
                <ErrorMessage name="password" component={ErrorSpan} />
                {!iconStatus ? (
                  <EyeSlashIcon onClick={iconClick}>
                    <use href={`${sprite}#icon-to-hide`}></use>
                  </EyeSlashIcon>
                ) : (
                  <EyeSlashIcon onClick={iconClick}>
                    <use href={`${sprite}#icon-to-open`}></use>
                  </EyeSlashIcon>
                )}
              </SignStyledLabel>
              {status && <ErrorSpan>{status}</ErrorSpan>}
              <SignButton
                className={!isValid || isLoading ? "button-disabled" : null}
                type="submit"
                disabled={!isValid || isLoading}>
                Sign In {isLoading && <ContentLoader />}
              </SignButton>
            </SignForm>
          )}
        </Formik>
        <SignInLink to="/signup">Sign up</SignInLink>
      </FormContainer>
    </SignUpContainer>
  );
};
