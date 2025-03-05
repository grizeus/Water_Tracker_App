import {
  FormField,
  Input,
  StyledErrorMessage,
  StyledLabel,
} from "./SettingModal.styled";

// NOTE: left email disabled for now
const CredentialsInput = ({ values, errors, touched }) => {
  return (
    <>
      <FormField>
        <StyledLabel htmlFor="username">Your name</StyledLabel>
        <Input
          type="text"
          id="username"
          name="name"
          className={errors.name && touched.name ? "error-input" : null}
          placeholder={values.name}
        />
        <StyledErrorMessage component="p" name="name" />
      </FormField>
      <FormField>
        <StyledLabel htmlFor="email">E-mail</StyledLabel>
        <Input
          type="email"
          id="email"
          name="email"
          disabled
          className={errors.email && touched.email ? "error-input" : null}
          placeholder={values.email}
        />
        <StyledErrorMessage component="p" name="email" />
      </FormField>
    </>
  );
};

export default CredentialsInput;
