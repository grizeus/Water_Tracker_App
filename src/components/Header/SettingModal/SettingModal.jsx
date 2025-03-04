import { BaseModalWindow } from "src/components/index";
import { Loader } from "src/components/index";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  updateUserInfoThunk,
  updateAvatarThunk,
} from "src/redux/auth/operations";
import { selectUser } from "src/redux/auth/selectors";

import {
  DesktopFormWrap,
  DesktopGenderWrap,
  ModalWrap,
  SaveBtn,
  SaveBtnWrap,
} from "./SettingModal.styled";
import { selectIsLoading } from "src/redux/root/selectors";
import UserPic from "./UserPic";
import GenderSelect from "./GenderSelect";
import CredentialsInput from "./CredentialsInput";
import PasswordSection from "./PasswordSection";

// NOTE: to figure out in future
const settingFormValidationSchema = Yup.object().shape({
  gender: Yup.string(),
  name: Yup.string()
    .min(3, "Username must be more then 3 characters long")
    .max(32, "Username must be less then 32 characters long"),
  email: Yup.string().email("Invalid email"),
  newPassword: Yup.string()
    .min(8, "New password must be at least 8 characters long")
    .max(64, "New password must be less then 64 characters long")
    .nullable()
    .test(
      "isNewPasswordDifferent",
      "New password should be different from the old one",
      (value, { parent }) => !value || value !== parent.oldPassword
    ),
  oldPassword: Yup.string()
    .min(8, "Old password must be at least 8 characters long")
    .max(64, "Old password must be less then 64 characters long")
    .when("newPassword", (newPassword, field) =>
      newPassword[0] ? field.required("Please enter old password") : field
    ),
  repeatedPassword: Yup.string().test(
    "isRepeatedPasswordValueMatched",
    "The entered password should match the new one",
    (value, { parent }) => !value || value === parent.newPassword
  ),
});

export const SettingModal = ({ onClose, onShow }) => {
  const dispatch = useDispatch();
  const { avatarURL, email, name, gender } = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoading);
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isAvatarLoading, setIsAvatarLoading] = useState(false);

  const initialValues = {
    gender: gender || "",
    name: name || "",
    email: email || "",
    oldPassword: "",
    newPassword: "",
    repeatedPassword: "",
  };

  const handleSubmit = (values, actions) => {
    if (values.outdatedPassword && !values.newPassword) {
      return;
    }
    const { gender, name, email, oldPassword, newPassword } = values;

    const formData = {
      gender,
      name,
      email,
      oldPassword,
      newPassword,
    };

    const dataSend = {};

    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        dataSend[key] = value;
      }
    });
    dispatch(updateUserInfoThunk(dataSend));

    onClose();
    actions.resetForm();
  };

  const handlePasswordVisibility = () => {
    setIsPasswordShown(previsPasswordShown => !previsPasswordShown);
  };

  const handleAvatarUpload = e => {
    let formData = new FormData();
    formData.append("avatarURL", e.target.files[0]);

    dispatch(updateAvatarThunk(formData)).then(data => {
      if (!data.error) {
        setIsAvatarLoading(false);
      }
    });
    setIsAvatarLoading(true);
  };

  return (
    <BaseModalWindow onClose={onClose} onShow={onShow} title="Setting">
      <ModalWrap>
        {
          <Formik
            initialValues={initialValues}
            validationSchema={settingFormValidationSchema}
            onSubmit={handleSubmit}>
            {({ values, errors, touched }) => (
              <Form>
                <UserPic
                  avatarURL={avatarURL}
                  name={name}
                  email={email}
                  onUpload={handleAvatarUpload}
                />
                <DesktopFormWrap>
                  <DesktopGenderWrap>
                    <GenderSelect values={values} />
                    <CredentialsInput
                      values={values}
                      errors={errors}
                      touched={touched}
                    />
                  </DesktopGenderWrap>
                  <PasswordSection
                    values={values}
                    errors={errors}
                    touched={touched}
                    isPasswordShown={isPasswordShown}
                    onVisible={handlePasswordVisibility}
                  />
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
  );
};
