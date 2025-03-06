import { Field } from "formik";
import {
  DownloadBtn,
  DownloadBtnText,
  DownloadWrap,
  FormText,
  IconDownload,
  UserAvatar,
  UserDefaultAvatar,
} from "./SettingModal.styled";

import sprite from "src/assets/images/sprite/sprite.svg";
import { ChangeEvent, useMemo } from "react";

const UserPic = ({
  avatarURL,
  name,
  email,
  onUpload,
}: {
  avatarURL: string | null;
  name: string | null;
  email: string | null;
  onUpload: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
}) => {
  const getUserInfo = useMemo(() => {
    const placeholder =
      name?.charAt(0).toUpperCase() || email?.charAt(0).toUpperCase();

    return {
      avatar: avatarURL || placeholder,
    };
  }, [name, email, avatarURL]);
  const { avatar } = getUserInfo;

  return (
    <div className="mb-6">
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
    </div>
  );
};

export default UserPic;
