import { NavLink } from "react-router-dom";
import logo from "src/assets/images/Logo.png";
import style from "./Logo.module.css";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../../redux/auth/selectors";
import type { RootState } from "../../../redux/store";

export const Logo = () => {
  const isLoggedIn = useSelector((state: RootState) => selectIsLoggedIn(state));

  return (
    <div className={style.LogoImg}>
      {isLoggedIn ? (
        <NavLink to="/home">
          <img src={logo} alt="logo" />
        </NavLink>
      ) : (
        <NavLink to="/">
          <img src={logo} alt="logo" />
        </NavLink>
      )}
    </div>
  );
};
