// import { BaseModalWindow } from '../../common/BaseModalWindow/BaseModalWindow.jsx';
import { Loader } from '../../common/Loader/Loader.jsx';
import { Field, Form, Formik } from 'formik';
import { ModalWrap, FormText } from './SettingModal.styled.jsx';
import * as Yup from 'yup';
import { BaseModalWindow } from '../../common/BaseModalWindow/BaseModalWindow.jsx';

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

export const SettingModal = () => {
  return (
    <>
      <BaseModalWindow></BaseModalWindow>
    </>
  );
};
