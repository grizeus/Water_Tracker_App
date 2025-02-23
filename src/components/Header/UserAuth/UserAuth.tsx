import sprite from 'src/assets/images/sprite/sprite.svg';
import { NavLink } from 'react-router-dom';
import style from "./UserAuth.module.css";

export const UserAuth = () => {
  return (
    <>
      <NavLink to="/signin">
        <button type="button" className={ style.userAuthBtn }>
          Sign in
          <svg className={style.signInIcon}>
            <use href={`${sprite}#icon-user`}></use>
          </svg>
        </button>
      </NavLink>
    </>
  );
};
