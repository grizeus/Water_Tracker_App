import { useSelector } from "react-redux";

import UserAuth from "./UserAuth/UserAuth.jsx";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

import { Container } from "../common/Container/Container.js";
import { Logo } from "../common/Logo/Logo.js";
import { UserLogo } from "./UserLogo/UserLogo.js";
import styles from "./Header.module.css";

const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <header>
      <Container>
        <div className={styles.containerHeader}>
          <Logo />
          {isLoggedIn ? <UserLogo /> : <UserAuth />}
        </div>
      </Container>
    </header>
  );
};

export default Header;