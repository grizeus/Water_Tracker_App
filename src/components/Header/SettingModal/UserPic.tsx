import { Field } from "formik";

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
      <span className="text-lg font-medium leading-5">Your photo</span>
      <div className="mt-2 flex items-center gap-2">
        {avatarURL ? (
          <img
            className="size-20 rounded-full"
            src={avatar}
            alt="user-avatar"
          />
        ) : (
          <span className="flex size-20 items-center justify-center rounded-full border border-perano bg-hawkes text-4xl leading-tight text-royal">
            {avatar}
          </span>
        )}
        <div className="flex cursor-pointer gap-2">
          <Field
            type="file"
            name="avatar"
            hidden
            accept="image/png, image/jpeg"
            onChange={onUpload}
          />
          <svg className="size-4 fill-transparent stroke-royal">
            <use href={`${sprite}#icon-arrow-up`}></use>
          </svg>
          <span className="text-sm font-medium leading-[18px] text-royal">
            Upload a photo
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserPic;
