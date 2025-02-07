import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';

import sprite from '../../../assets/images/sprite/sprite.svg';

import { selectIsLoading } from '../../../redux/root/rootSelectors';
import { logInThunk } from '../../../redux/auth/authOperations';

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
} from '../../SignUp/SignUpForm/SignUpForm.styled';

const emailRules = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
const validationSchema = Yup.object({
  email: Yup.string('Enter your email')
    .email('Enter a valid email')
    .matches(emailRules, 'Email is not valid')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Your password is too short.'),
});

const initialValues = { email: '', password: '' };

export const SignInForm = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(selectIsLoading);

  const handleLoginSubmit = (values, { setSubmitting, setStatus }) => {
    dispatch(logInThunk(values))
      .unwrap()
      .catch(({ status, message }) => {
        if (status === 401) {
          setStatus('Email or password is wrong');
        } else {
          setStatus(`Login failed: ${message}`);
        }
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <SignUpContainer>
      <BootleImg />
      <FormContainer>
        <FormTitle>Sign In</FormTitle>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLoginSubmit}
        >
          <SignForm>
            <SignStyledLabel>
              Enter your email
              <SignStyledInput type="email" name="email" placeholder="E-mail" />
            </SignStyledLabel>
            <SignStyledLabel>
              <SignStyledInput name="password" placeholder="Password" />
            </SignStyledLabel>
            <SignButton type="submit">Sign In</SignButton>
          </SignForm>
        </Formik>
      </FormContainer>
    </SignUpContainer>
  );
};
