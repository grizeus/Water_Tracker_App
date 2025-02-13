import { ContentLoader } from 'components';
import { ErrorMessage, Formik } from 'formik';
import { useState } from 'react';
import PasswordStrengthBar from 'react-password-strength-bar';
import { useDispatch, useSelector } from 'react-redux';
import sprite from 'src/assets/images/sprite/sprite.svg';
import * as Yup from 'yup';
import { registerThunk } from '../../../redux/auth/authOperations';
import { selectIsLoading } from '../../../redux/root/rootSelectors';
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
  SignUpLink,
  SuccessSvg,
} from './SignUpForm.styled';

const validationSchema = Yup.object({
  email: Yup.string('Enter your email')
    .email('Enter a valid email')
    .matches(/^[^\s@]+@[^\s@]+.[^\s@]+$/, 'Email is not valid')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Your password is too short.')
    .matches(/[a-zA-Z]/, 'Password should contain at least one Latin letters.'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Password must match!')
    .required('Confirm password is reqired!'),
});

export const SignUpForm = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(selectIsLoading);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  return (
    <SignUpContainer>
      <BootleImg />
      <FormContainer>
        <FormTitle>Sign Up</FormTitle>
        <Formik
          validateOnChange
          initialValues={{ email: '', password: '', confirmPassword: '' }}
          validationSchema={validationSchema}
          onSubmit={({ email, password }) => {
            dispatch(registerThunk({ email, password }));
          }}
        >
          {({ errors, isValid, touched, values }) => (
            <SignForm>
              <SignStyledLabel>
                Enter your email
                <SignStyledInput
                  className={
                    errors.email && touched.email ? 'input-with-error' : null
                  }
                  type="email"
                  name="email"
                  placeholder="E-mail"
                />
                <ErrorMessage name="email" component={ErrorSpan} />
                {errors.email && values.email && <ErrorSvg />}
                {!errors.email && values.email && <SuccessSvg />}
              </SignStyledLabel>

              {/* Поле пароля */}
              <SignStyledLabel>
                Enter your password
                <SignStyledInput
                  className={errors.password ? 'input-with-error' : null}
                  type={passwordVisible ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                />
                <ErrorMessage name="password" component={ErrorSpan} />
                <EyeSlashIcon onClick={() => setPasswordVisible(!passwordVisible)}>
                  <use href={`${sprite}#${passwordVisible ? 'icon-to-open' : 'icon-to-hide'}`}></use>
                </EyeSlashIcon>
                <PasswordStrengthBar
                  style={{ height: '5px' }}
                  scoreWordStyle={{ margin: '0' }}
                  password={values.password}
                  minLength={8}
                />
              </SignStyledLabel>

              {/* Поле повторного введення пароля */}
              <SignStyledLabel>
                Repeat Password
                <SignStyledInput
                  className={errors.confirmPassword ? 'input-with-error' : null}
                  type={confirmPasswordVisible ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Repeat password"
                />
                <ErrorMessage name="confirmPassword" component={ErrorSpan} />
                <EyeSlashIcon onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                  <use href={`${sprite}#${confirmPasswordVisible ? 'icon-to-open' : 'icon-to-hide'}`}></use>
                </EyeSlashIcon>
                <PasswordStrengthBar
                  password={values.confirmPassword}
                  scoreWordStyle={{ margin: '0' }}
                />
              </SignStyledLabel>

              <SignButton
                className={!isValid ? 'button-disabled' : null}
                type="submit"
              >
                Sign Up {isLoading && <ContentLoader />}
              </SignButton>
            </SignForm>
          )}
        </Formik>
        <SignUpLink to="/signin">Sign In</SignUpLink>
      </FormContainer>
    </SignUpContainer>
  );
};
