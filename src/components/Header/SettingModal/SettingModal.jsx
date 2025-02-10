import { BaseModalWindow } from '../../common/BaseModalWindow/BaseModalWindow.jsx';
import { Loader } from '../../common/Loader/Loader.jsx';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import sprite from 'src/assets/images/sprite/sprite.svg';
import * as Yup from 'yup';
import {
  editUserInfoThunk,
  updateAvatarThunk,
} from '../../../redux/auth/authOperations';
import { selectUser } from '../../../redux/auth/authSelectors';
import { selectIsLoading } from '../../../redux/root/rootSelectors';
import defaultAvatar from '../../../assets/images/default_avatar.png';

import {
  Avatar,
  DesktopFormWrap,
  DesktopGenderWrap,
  DesktopPasswordWrap,
  DownloadBtn,
  DownloadBtnText,
  DownloadWrap,
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
  GenderFormField,
  GenderText,
  RadioBtn,
  RadioBtnLabel,
  RadioBtnText,
  RadioBtnWrap,
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
      // (value, { parent }) => !value || value !== parent.outdatedPassword,
      (value, { parent }) => !value || value !== parent.oldPassword,
    ),
  oldPassword: Yup.string()
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
  const { avatarURL, email, name, gender } = useSelector(selectUser);
  const { isLoading } = useSelector(selectIsLoading);
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isAvatarLoading, setIsAvatarLoading] = useState(false);
  // const [isAvatarLoading, setIsAvatarLoading] = useState(false || '');

  const initialValues = {
    gender: gender || '',
    name: name || '',
    email: email || '',
    // outdatedPassword: '',
    oldPassword: '',

    newPassword: '',
    repeatedPassword: '',
  };

  const handleSubmit = (values, actions) => {
    if (values.outdatedPassword && !values.newPassword) {
      return;
    }
    // const { gender, name, email, outdatedPassword, newPassword } = values;

    const { gender, name, email, oldPassword, newPassword } = values;

    const formData = {
      gender,
      name,
      email,

      // outdatedPassword,
      oldPassword,

      newPassword,
    };

    const dataSend = {};

    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        dataSend[key] = value;
      }
    });

    // console.log(dataSend);

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

  const handleAvatarDownload = e => {
    let formData = new FormData();
    formData.append('avatar', e.target.files[0]);

    dispatch(updateAvatarThunk(formData)).then(data => {
      // console.log(data);

      if (!data.error) {
        setIsAvatarLoading(false);
      }
    });
    setIsAvatarLoading(true);
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
                  <FormField>
                    <FormText>Your photo</FormText>
                    <DownloadWrap>
                      {isAvatarLoading ? (
                        <Loader
                          width={'80px'}
                          height={'80px'}
                          strokeColor={'#407bff'}
                        />
                      ) : (
                        <Avatar
                          src={avatarURL ? avatarURL : defaultAvatar}
                          alt="user avatar"
                          width="80px"
                          height="80px"
                        />
                      )}
                      <DownloadBtn>
                        <Field
                          type="file"
                          name="avatar"
                          hidden
                          accept="image/png, image/jpeg"
                          onChange={handleAvatarDownload}
                        />
                        <IconDownload>
                          <use href={`${sprite}#icon-arrow-up`}></use>
                        </IconDownload>
                        <DownloadBtnText>Upload a photo</DownloadBtnText>
                      </DownloadBtn>
                    </DownloadWrap>
                  </FormField>
                  <DesktopFormWrap>
                    <DesktopGenderWrap>
                      <GenderFormField>
                        <GenderText>Your gender identity</GenderText>
                        <RadioBtnWrap>
                          <RadioBtnLabel>
                            <RadioBtn
                              type="radio"
                              name="gender"
                              value="woman"
                              checked={values.gender === 'woman'}
                            />
                            <RadioBtnText>Woman</RadioBtnText>
                          </RadioBtnLabel>
                          <RadioBtnLabel>
                            <RadioBtn
                              type="radio"
                              name="gender"
                              value="man"
                              checked={values.gender === 'man'}
                            />
                            <RadioBtnText>Man</RadioBtnText>
                          </RadioBtnLabel>
                        </RadioBtnWrap>
                      </GenderFormField>
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
                            name="oldPassword"
                            className={
                              errors.oldPassword && touched.oldPassword
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
                        <StyledErrorMessage component="p" name="oldPassword" />
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
                              (values.oldPassword && !values.newPassword)
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
                        {values.oldPassword && !values.newPassword && (
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
                    <li>
                      <SaveBtn type="submit">
                        Save {isLoading && !isAvatarLoading && <Loader />}
                      </SaveBtn>
                    </li>
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
