import styles from "./UserLogo.module.css";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

import { selectUser } from "src/redux/auth/selectors";
import { getUserThunk } from "src/redux/auth/operations";

import sprite from "src/assets/images/sprite/sprite.svg";
import UserLogoModal from "../UserLogoModal/UserLogoModal";

import { determineFirstLetter } from "../../../helpers/determineFirstLetter";

const ANIMATION_CONFIG = {
  initial: { opacity: 0, transform: "scale(0)" },
  animate: { opacity: 1, transform: "scale(1)" },
  exit: { opacity: 0, transform: "scale(0)" },
  transition: { ease: "backOut", duration: 0.7 },
};

export const UserLogo = () => {
  const dispatch = useDispatch();
  const { name, email, avatarURL } = useSelector(selectUser);

  const defaultAvatar = determineFirstLetter(name);

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
    <div className={styles.userLogoContainer}>
      <p className={styles.userLogoTitle}>{userName}</p>
      <button
        type="button"
        className={styles.userLogoBtn}
        onClick={toggleModal}
        ref={btnRef}>
        {avatarURL ? (
          <img className={styles.userAvatar} src={avatar} alt="user-avatar" />
        ) : (
          <p className={styles.userDefaultAvatar}>{defaultAvatar}</p>
        )}

        <svg
          className={styles.userModalIcon}
          style={{ transform: `rotate(${modalIsOpen ? 180 : 0}deg)` }}>
          <use href={`${sprite}#icon-arrow-down`}></use>
        </svg>
      </button>
      <div className="relative z-[1]">
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
      </div>
    </div>
  );
};
