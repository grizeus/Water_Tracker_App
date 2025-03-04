import { Field } from "formik";
import {
  DownloadBtn,
  DownloadBtnText,
  DownloadWrap,
  FormField,
  FormText,
  IconDownload,
  UserAvatar,
  UserDefaultAvatar,
} from "./SettingModal.styled";

import sprite from "src/assets/images/sprite/sprite.svg";
import { useMemo } from "react";

const UserPic = ({ avatarURL, name, email, onUpload }) => {
  const getUserInfo = useMemo(() => {
    const placeholder =
      name?.charAt(0).toUpperCase() || email?.charAt(0).toUpperCase();

    return {
      avatar: avatarURL || placeholder,
    };
  }, [name, email, avatarURL]);
  const { avatar } = getUserInfo;

  return (
    <FormField>
      <FormText>Your photo</FormText>
      <DownloadWrap>
        {avatarURL ? (
          <UserAvatar src={avatar} alt="user-avatar" />
        ) : (
          <UserDefaultAvatar>{avatar}</UserDefaultAvatar>
        )}
        <DownloadBtn>
          <Field
            type="file"
            name="avatar"
            hidden
            accept="image/png, image/jpeg"
            onChange={onUpload}
          />
          <IconDownload>
            <use href={`${sprite}#icon-arrow-up`}></use>
          </IconDownload>
          <DownloadBtnText>Upload a photo</DownloadBtnText>
        </DownloadBtn>
      </DownloadWrap>
    </FormField>
  );
};

export default UserPic;
