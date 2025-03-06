import {
  DesktopPasswordWrap,
  IconBtn,
  Input,
  LastPasswordFormField,
  PasswordFormField,
  PasswordIcon,
  PasswordInputWrap,
  PasswordLabel,
  PasswordText,
  StyledErrorMessage,
  StyledErrorText,
} from "./SettingModal.styled";

import sprite from "src/assets/images/sprite/sprite.svg";

const PasswordSection = ({
  values,
  errors,
  touched,
  isPasswordShown,
  onVisible,
}) => {
  return (
    <DesktopPasswordWrap>
      <PasswordText>Password</PasswordText>
      <PasswordFormField>
        <PasswordLabel htmlFor="oldPassword">Outdated password:</PasswordLabel>
        <PasswordInputWrap>
          <Input
            type={isPasswordShown ? "text" : "password"}
            id="oldPassword"
            name="oldPassword"
            className={
              errors.oldPassword && touched.oldPassword ? "error-input" : null
            }
            placeholder="Password"
          />
          <IconBtn type="button" onClick={onVisible}>
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
        <PasswordLabel htmlFor="password">New Password:</PasswordLabel>
        <PasswordInputWrap>
          <Input
            type={isPasswordShown ? "text" : "password"}
            id="password"
            name="newPassword"
            className={
              (errors.newPassword && touched.newPassword) ||
              (values.oldPassword && !values.newPassword)
                ? "error-input"
                : null
            }
            placeholder="Password"
          />
          <IconBtn type="button" onClick={onVisible}>
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
          <StyledErrorText>Please, enter new password</StyledErrorText>
        )}
        <StyledErrorMessage component="p" name="newPassword" />
      </PasswordFormField>
      <LastPasswordFormField>
        <PasswordLabel htmlFor="repeatedPassword">
          Repeat new password:
        </PasswordLabel>
        <PasswordInputWrap>
          <Input
            type={isPasswordShown ? "text" : "password"}
            id="repeatedPassword"
            name="repeatedPassword"
            className={
              values.newPassword !== values.repeatedPassword
                ? "error-input"
                : null
            }
            placeholder="Password"
          />
          <IconBtn type="button" onClick={onVisible}>
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
        <StyledErrorMessage component="p" name="repeatedPassword" />
      </LastPasswordFormField>
    </DesktopPasswordWrap>
  );
};

export default PasswordSection;
