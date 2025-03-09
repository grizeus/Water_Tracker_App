import styles from "./UserLogo.module.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

import { selectUser } from "../../../redux/auth/selectors";
import { getUserThunk } from "../../../redux/auth/operations";

import sprite from "src/assets/images/sprite/sprite.svg";
import UserLogoModal from "../UserLogoModal/UserLogoModal";

import { AppDispatch } from "../../../redux/store";
import { User } from "../../../../types/global";
import firstLetterExtrudor from "../../../helpers/utils/firstLetterExtrudor";

const ANIMATION_CONFIG = {
  initial: { opacity: 0, transform: "scale(0)" },
  animate: { opacity: 1, transform: "scale(1)" },
  exit: { opacity: 0, transform: "scale(0)" },
  transition: { ease: "backOut", duration: 0.7 },
};
export const UserLogo = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user: User = useSelector(selectUser);
  const defaultAvatar = firstLetterExtrudor(user.name);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    void dispatch(getUserThunk());
  }, [dispatch]);

  const toggleModal = useCallback(() => {
    setModalIsOpen(prev => !prev);
  }, []);

  return (
    <div className={styles.userLogoContainer}>
      <p className={styles.userLogoTitle}>{user.name}</p>
      <button
        type="button"
        className={styles.userLogoBtn}
        onClick={toggleModal}
        ref={btnRef}>
        {user.avatarURL ? (
          <img
            className={styles.userAvatar}
            src={user.avatarURL}
            alt="user-avatar"
          />
        ) : (
          <span className={styles.userDefaultAvatar}>{defaultAvatar}</span>
        )}

        <svg
          className={styles.userModalIcon}
          style={{ transform: `rotate(${modalIsOpen ? 180 : 0}deg)` }}>
          <use href={`${sprite}#icon-arrow-down`} />
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
