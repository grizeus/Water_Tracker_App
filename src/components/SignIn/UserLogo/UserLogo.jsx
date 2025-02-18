import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

import { UserLogoModal } from "components";
import { selectUser } from "src/redux/auth/selectors.js";
import { getUserThunk } from "src/redux/auth/operations.js";
import { UserLogoModalWrap } from "../UserLogoModal/UserLogoModal.styled";
import {
  UserAvatar,
  UserDefaultAvatar,
  UserLogoBtn,
  UserLogoContainer,
  UserLogoTitle,
  UserModalIcon,
} from "./UserLogo.styled";
import sprite from "src/assets/images/sprite/sprite.svg";

const ANIMATION_CONFIG = {
  initial: { opacity: 0, transform: "scale(0)" },
  animate: { opacity: 1, transform: "scale(1)" },
  exit: { opacity: 0, transform: "scale(0)" },
  transition: { ease: "backOut", duration: 0.7 },
};

export const UserLogo = () => {
  const dispatch = useDispatch();
  const { name, email, avatarURL } = useSelector(selectUser);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const btnRef = useRef(null);

  useEffect(() => {
    dispatch(getUserThunk());
  }, [dispatch]);

  const toggleModal = useCallback(() => {
    setModalIsOpen(prev => !prev);
  }, []);

  const getUserInfo = useMemo(() => {
    const placeholder =
      name?.charAt(0).toUpperCase() || email?.charAt(0).toUpperCase();

    return {
      userName: name || placeholder,
      avatar: avatarURL || placeholder,
    };
  }, [name, email, avatarURL]);
  const { userName, avatar } = getUserInfo;

  return (
    <UserLogoContainer>
      <UserLogoTitle>{userName}</UserLogoTitle>
      <UserLogoBtn onClick={toggleModal} ref={btnRef}>
        {avatarURL ? (
          <UserAvatar src={avatar} alt="user-avatar" />
        ) : (
          <UserDefaultAvatar>{avatar}</UserDefaultAvatar>
        )}

        <UserModalIcon
          style={{ transform: `rotate(${modalIsOpen ? 180 : 0}deg)` }}>
          <use href={`${sprite}#icon-arrow-down`}></use>
        </UserModalIcon>
      </UserLogoBtn>
      <UserLogoModalWrap>
        <AnimatePresence>
          {modalIsOpen && (
            <motion.div {...ANIMATION_CONFIG}>
              <UserLogoModal
                setOnShowDropdown={setModalIsOpen}
                parentRef={btnRef}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </UserLogoModalWrap>
    </UserLogoContainer>
  );
};
