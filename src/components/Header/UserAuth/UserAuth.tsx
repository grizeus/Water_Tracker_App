import { NavLink } from 'react-router-dom';

import sprite from 'src/assets/images/sprite/sprite.svg';
import style from "./UserAuth.module.css";

const UserAuth = () => {
  return (
    <>
      <NavLink to="/signin"
        className={ style.userAuthBtn }>
          Sign in
          <svg className={style.signInIcon}>
            <use href={`${sprite}#icon-user`}></use>
          </svg>
      </NavLink>
    </>
  );
};

export default UserAuth;
