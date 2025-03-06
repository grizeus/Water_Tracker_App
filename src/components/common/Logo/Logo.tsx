import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectIsLoggedIn } from "../../../redux/auth/selectors";
import logo from "src/assets/images/Logo.png";

export const Logo = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className="w-[102px] h-12">
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
