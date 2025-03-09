import { ErrorMessage, Field, FormikErrors, FormikTouched } from "formik";
import { UserFormData } from "../../../../types/global";

// NOTE: left email disabled for now
const CredentialsInput = ({
  values,
  errors,
  touched,
}: {
  values: UserFormData;
  errors: FormikErrors<UserFormData>;
  touched: FormikTouched<UserFormData>;
}) => {
  return (
    <>
      <div className="mb-6 flex flex-col">
        <label
          className="mb-2 text-lg font-medium leading-5"
          htmlFor="username">
          Your name
        </label>
        <Field
          type="text"
          id="username"
          name="name"
          className={`${errors.name && touched.name ? "border-sunset text-sunset" : ""} h-11 w-full rounded-md border border-hawkes bg-white px-[10px] py-3 text-base text-perano placeholder:text-perano focus:text-royal focus:outline-none`}
          placeholder={values.name}
        />
        <ErrorMessage
          component="span"
          name="name"
          className="mt-1 text-sm leading-[18px] text-sunset"
        />
      </div>
      <div className="mb-6">
        <label
          className="mb-2 inline-block text-lg font-medium leading-5"
          htmlFor="email">
          E-mail
        </label>
        <Field
          type="email"
          id="email"
          name="email"
          disabled
          className="h-11 w-full rounded-md border border-hawkes bg-white px-[10px] py-3 text-base text-perano placeholder:text-perano focus:text-royal focus:outline-none"
          placeholder={values.email}
        />
      </div>
    </>
  );
};

export default CredentialsInput;
