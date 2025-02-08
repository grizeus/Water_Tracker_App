import { BaseModalWindow } from '../../common/BaseModalWindow/BaseModalWindow.jsx';

import { Form, Formik } from 'formik';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import sprite from 'src/assets/images/sprite/sprite.svg';
import * as Yup from 'yup';
import { editUserInfoThunk } from '../../../redux/auth/authOperations';
import { selectIsLoading } from '../../../redux/root/rootSelectors';

import {
  DesktopFormWrap,
  DesktopGenderWrap,
  DesktopPasswordWrap,
  FormField,
  FormText,
  IconBtn,
  IconDownload,
  Input,
  LastPasswordFormField,
  ModalWrap,
  PasswordFormField,
  PasswordIcon,
  PasswordInputWrap,
  PasswordLabel,
  PasswordText,
  SaveBtn,
  SaveBtnWrap,
  StyledErrorMessage,
  StyledErrorText,
  StyledLabel,
} from './SettingModal.styled';

const settingFormValidationSchema = Yup.object().shape({
  gender: Yup.string(),
  name: Yup.string()
    .min(3, 'Username must be more then 3 characters long')
    .max(32, 'Username must be less then 32 characters long'),
  email: Yup.string().email('Invalid email'),
  newPassword: Yup.string()
    .min(8, 'New password must be at least 8 characters long')
    .max(64, 'New password must be less then 64 characters long')
    .nullable()
    .test(
      'isNewPasswordDifferent',
      'New password should be different from the old one',
      (value, { parent }) => !value || value !== parent.outdatedPassword,
    ),
  outdatedPassword: Yup.string()
    .min(8, 'Old password must be at least 8 characters long')
    .max(64, 'Old password must be less then 64 characters long')
    .when('newPassword', (newPassword, field) =>
      newPassword[0] ? field.required('Please enter old password') : field,
    ),
  repeatedPassword: Yup.string().test(
    'isRepeatedPasswordValueMatched',
    'The entered password should match the new one',
    (value, { parent }) => !value || value === parent.newPassword,
  ),
});

export const SettingModal = ({ onClose, onShow }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(selectIsLoading);
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const initialValues = {
    outdatedPassword: '',
    newPassword: '',
    repeatedPassword: '',
  };

  const handleSubmit = (values, actions) => {
    if (values.outdatedPassword && !values.newPassword) {
      return;
    }

    const { gender, name, email, outdatedPassword, newPassword } = values;

    const formData = {
      gender,
      name,
      email,
      outdatedPassword,
      newPassword,
    };

    const dataSend = {};

    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        dataSend[key] = value;
      }
    });

    dispatch(editUserInfoThunk(dataSend)).then(data => {
      if (!data.error) {
        onClose();
        actions.resetForm();
      }
    });
  };

  const handlePasswordVisibility = () => {
    setIsPasswordShown(previsPasswordShown => !previsPasswordShown);
  };

  return (
    <>
      <BaseModalWindow onClose={onClose} onShow={onShow} title="Setting">
        <ModalWrap>
          {
            <Formik
              initialValues={initialValues}
              validationSchema={settingFormValidationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched }) => (
                <Form>
                  <DesktopFormWrap>
                    <DesktopGenderWrap>
                      <FormField>
                        <StyledLabel htmlFor="username">Your name</StyledLabel>
                        <Input
                          type="text"
                          id="username"
                          name="name"
                          className={
                            errors.name && touched.name ? 'error-input' : null
                          }
                          placeholder={values.name}
                        />
                        <StyledErrorMessage component="p" name="name" />
                      </FormField>
                      <div>
                        <StyledLabel htmlFor="email">E-mail</StyledLabel>
                        <Input
                          type="email"
                          id="email"
                          name="email"
                          className={
                            errors.email && touched.email ? 'error-input' : null
                          }
                          placeholder={values.email}
                        />
                        <StyledErrorMessage component="p" name="email" />
                      </div>
                    </DesktopGenderWrap>
                    <DesktopPasswordWrap>
                      <PasswordText>Password</PasswordText>
                      <PasswordFormField>
                        <PasswordLabel htmlFor="oldPassword">
                          Outdated password:
                        </PasswordLabel>
                        <PasswordInputWrap>
                          <Input
                            type={isPasswordShown ? 'text' : 'password'}
                            id="oldPassword"
                            name="outdatedPassword"
                            className={
                              errors.outdatedPassword &&
                              touched.outdatedPassword
                                ? 'error-input'
                                : null
                            }
                            placeholder="Password"
                          />
                          <IconBtn
                            type="button"
                            onClick={handlePasswordVisibility}
                          >
                            {isPasswordShown ? (
                              <PasswordIcon>
                                <use href={`${sprite}#icon-to-open`}></use>
                              </PasswordIcon>
                            ) : (
                              <PasswordIcon>
                                <use href={`${sprite}#icon-to-hide`}></use>
                              </PasswordIcon>
                            )}
                          </IconBtn>
                        </PasswordInputWrap>
                        <StyledErrorMessage
                          component="p"
                          name="outdatedPassword"
                        />
                      </PasswordFormField>
                      <PasswordFormField>
                        <PasswordLabel htmlFor="password">
                          New Password:
                        </PasswordLabel>
                        <PasswordInputWrap>
                          <Input
                            type={isPasswordShown ? 'text' : 'password'}
                            id="password"
                            name="newPassword"
                            className={
                              (errors.newPassword && touched.newPassword) ||
                              (values.outdatedPassword && !values.newPassword)
                                ? 'error-input'
                                : null
                            }
                            placeholder="Password"
                          />
                          <IconBtn
                            type="button"
                            onClick={handlePasswordVisibility}
                          >
                            {isPasswordShown ? (
                              <PasswordIcon>
                                <use href={`${sprite}#icon-to-open`}></use>
                              </PasswordIcon>
                            ) : (
                              <PasswordIcon>
                                <use href={`${sprite}#icon-to-hide`}></use>
                              </PasswordIcon>
                            )}
                          </IconBtn>
                        </PasswordInputWrap>
                        {values.outdatedPassword && !values.newPassword && (
                          <StyledErrorText>
                            Please, enter new password
                          </StyledErrorText>
                        )}
                        <StyledErrorMessage component="p" name="newPassword" />
                      </PasswordFormField>
                      <LastPasswordFormField>
                        <PasswordLabel htmlFor="repeatedPassword">
                          Repeat new password:
                        </PasswordLabel>
                        <PasswordInputWrap>
                          <Input
                            type={isPasswordShown ? 'text' : 'password'}
                            id="repeatedPassword"
                            name="repeatedPassword"
                            className={
                              values.newPassword !== values.repeatedPassword
                                ? 'error-input'
                                : null
                            }
                            placeholder="Password"
                          />
                          <IconBtn
                            type="button"
                            onClick={handlePasswordVisibility}
                          >
                            {isPasswordShown ? (
                              <PasswordIcon>
                                <use href={`${sprite}#icon-to-open`}></use>
                              </PasswordIcon>
                            ) : (
                              <PasswordIcon>
                                <use href={`${sprite}#icon-to-hide`}></use>
                              </PasswordIcon>
                            )}
                          </IconBtn>
                        </PasswordInputWrap>
                        <StyledErrorMessage
                          component="p"
                          name="repeatedPassword"
                        />
                      </LastPasswordFormField>
                    </DesktopPasswordWrap>
                  </DesktopFormWrap>
                  <SaveBtnWrap>
                    <SaveBtn type="submit">Save</SaveBtn>
                  </SaveBtnWrap>
                </Form>
              )}
            </Formik>
          }
        </ModalWrap>
      </BaseModalWindow>
    </>
  );
};
