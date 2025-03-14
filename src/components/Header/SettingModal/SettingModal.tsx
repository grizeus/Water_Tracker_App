import { Form, Formik, FormikHelpers } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { ChangeEvent } from "react";

import { BaseModalWindow } from "../../common/BaseModalWindow/BaseModalWindow";
import { ContentLoader } from "../../common/Loader/Loader";
import {
  updateUserInfoThunk,
  updateAvatarThunk,
} from "../../../redux/auth/operations";
import {
  selectIsAvatarLoading,
  selectUser,
} from "../../../redux/auth/selectors";

import { selectIsLoading } from "../../../redux/root/selectors";
import UserPic from "./UserPic";
import GenderSelect from "./GenderSelect";
import CredentialsInput from "./CredentialsInput";
import PasswordSection from "./PasswordSection";
import { AppDispatch } from "../../../redux/store";
import { Gender, OpenerType, UserFormData } from "../../../../types/global";

const settingFormValidationSchema = Yup.object().shape({
  gender: Yup.string(),
  name: Yup.string()
    .min(3, "Username must be more then 3 characters long")
    .max(32, "Username must be less then 32 characters long"),
  email: Yup.string().email("Invalid email"),
  oldPassword: Yup.string()
    .min(8, "Old password must be at least 8 characters long")
    .max(64, "Old password must be less then 64 characters long")
    .when("newPassword", (newPassword, field) =>
      newPassword[0] ? field.required("Please enter old password") : field
    ),
  newPassword: Yup.string()
    .min(8, "New password must be at least 8 characters long")
    .max(64, "New password must be less then 64 characters long")
    .nullable()
    .test(
      "isNewPasswordDifferent",
      "New password should be different from the old one",
      function (value) {
        return !value || value !== (this.parent as UserFormData).oldPassword;
      }
    ),
  repeatedPassword: Yup.string().test(
    "isRepeatedPasswordValueMatched",
    "The entered password should match the new one",
    function (value) {
      return !value || value === (this.parent as UserFormData).newPassword;
    }
  ),
});

export const SettingModal = ({
  onClose,
  onShow,
}: {
  onClose: OpenerType;
  onShow: OpenerType;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { avatarURL, email, name, gender } = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoading);
  const isAvatarLoading = useSelector(selectIsAvatarLoading);

  const initialValues: UserFormData = {
    gender: gender || "woman",
    name: name || "",
    email: email || "example@mail.co.uk",
    oldPassword: "",
    newPassword: "",
    repeatedPassword: "",
  };

  const handleSubmit = async (
    values: UserFormData,
    actions: FormikHelpers<UserFormData>
  ) => {
    if (values.oldPassword && !values.newPassword) {
      return;
    }
    const dataSend: Partial<UserFormData> = {};

    (
      Object.entries(values) as [
        keyof UserFormData,
        UserFormData[keyof UserFormData],
      ][]
    ).forEach(([key, value]) => {
      if (value) {
        if (key === "repeatedPassword") {
          return;
        }
        if (key === "gender") {
          dataSend[key] = value as Gender;
        } else {
          dataSend[key] = value;
        }
      }
    });
    await dispatch(updateUserInfoThunk(dataSend));

    onClose();
    actions.resetForm();
  };

  const handleAvatarUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();

    if (e.target.files && e.target.files[0]) {
      formData.append("avatarURL", e.target.files[0]);

      await dispatch(updateAvatarThunk(formData));
    }
  };

  return (
    <BaseModalWindow onClose={onClose} onShow={onShow} title="Setting">
      <div className="rounded-[10px] px-3 pb-8 md:w-[704px] md:px-6 xl:w-[1008px]">
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
                <div className="xl:flex xl:gap-6">
                  <div className="md:w-[392px]">
                    <GenderSelect />
                    <CredentialsInput
                      values={values}
                      errors={errors}
                      touched={touched}
                    />
                  </div>
                  <PasswordSection
                    values={values}
                    errors={errors}
                    touched={touched}
                  />
                </div>

                <button
                  className="flex w-full items-center justify-center rounded-[10px] bg-royal px-[30px] py-2 text-base leading-5 text-white shadow-sm transition-shadow duration-300 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none md:ml-auto md:w-40 md:py-2.5 md:text-lg md:leading-6"
                  type="submit">
                  Save {isLoading && !isAvatarLoading && <ContentLoader />}
                </button>
              </Form>
            )}
          </Formik>
        }
      </div>
    </BaseModalWindow>
  );
};
