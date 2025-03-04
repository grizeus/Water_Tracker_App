import {
  GenderFormField,
  GenderText,
  RadioBtn,
  RadioBtnLabel,
  RadioBtnText,
  RadioBtnWrap,
} from "./SettingModal.styled";

const GenderSelect = ({ values }) => {
  return (
    <GenderFormField>
      <GenderText>Your gender identity</GenderText>
      <RadioBtnWrap>
        <RadioBtnLabel>
          <RadioBtn
            type="radio"
            name="gender"
            value="woman"
            checked={values.gender === "woman"}
          />
          <RadioBtnText>Woman</RadioBtnText>
        </RadioBtnLabel>
        <RadioBtnLabel>
          <RadioBtn
            type="radio"
            name="gender"
            value="man"
            checked={values.gender === "man"}
          />
          <RadioBtnText>Man</RadioBtnText>
        </RadioBtnLabel>
      </RadioBtnWrap>
    </GenderFormField>
  );
};

export default GenderSelect;
