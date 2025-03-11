import { ReactNode, useState } from "react";
import { ErrorMessage, Field, FormikErrors, FormikTouched } from "formik";

import sprite from "src/assets/images/sprite/sprite.svg";
import { UserFormData } from "../../../../types/global";

const PasswordField = ({
  id,
  name,
  label,
  errorStyle,
  customError,
}: {
  id: string;
  name: string;
  label: string;
  errorStyle: string | null;
  customError?: ReactNode | null;
}) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const toggleVisibility = () => {
    setIsPasswordShown(prev => !prev);
  };

  return (
    <div className="mb-3 h-[72px] last-of-type:mb-0">
      <label className="text-base leading-tight" htmlFor={id}>
        {label}
      </label>
      <div className="relative mt-2">
        <Field
          type={isPasswordShown ? "text" : "password"}
          id={id}
          name={name}
          className={`${errorStyle} py3 h-11 w-full rounded-md border border-hawkes bg-white px-2.5 text-base leading-tight text-perano outline-none placeholder:text-perano focus:text-royal`}
          placeholder="Password"
        />
        <button
          className="border-none bg-transparent p-0"
          type="button"
          onClick={toggleVisibility}>
          <svg className="absolute right-2.5 top-1/2 size-4 -translate-y-1/2 fill-none stroke-royal">
            <use
              href={`${sprite}#icon-${isPasswordShown ? "to-open" : "to-hide"}`}></use>
          </svg>
        </button>
      </div>
      {customError}
      <ErrorMessage
        className="mt-1 text-sm leading-[18px] text-sunset"
        component="p"
        name={name}
      />
    </div>
  );
};

const PasswordSection = ({
  values,
  errors,
  touched,
}: {
  values: UserFormData;
  errors: FormikErrors<UserFormData>;
  touched: FormikTouched<UserFormData>;
}) => {
  return (
    <div className="min-h-80 md:w-[392px] text-charcoal">
      <p className="mb-3 text-lg font-medium leading-5">Password</p>

      <PasswordField
        id="oldPassword"
        name="oldPassword"
        label="Outdated password:"
        errorStyle={
          errors.oldPassword && touched.oldPassword
            ? "border border-sunset text-sunset focus:text-sunset placeholder:text-sunset"
            : null
        }
      />

      <PasswordField
        id="password"
        name="newPassword"
        label="New Password:"
        errorStyle={
          (errors.newPassword && touched.newPassword) ||
          (values.oldPassword && !values.newPassword)
            ? "border border-sunset text-sunset focus:text-sunset placeholder:text-sunset"
            : null
        }
        customError={
          values.oldPassword &&
          !values.newPassword && (
            <span className="mt-1 block text-sm leading-[18px] text-sunset">
              Please, enter new password
            </span>
          )
        }
      />

      <PasswordField
        id="repeatedPassword"
        name="repeatedPassword"
        label="Repeat new password:"
        errorStyle={
          values.newPassword !== values.repeatedPassword
            ? "border border-sunset text-sunset placeholder:text-sunset focus:text-sunset"
            : null
        }
      />
    </div>
  );
};

export default PasswordSection;
