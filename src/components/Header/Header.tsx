import { useSelector } from "react-redux";

import { Container, Logo, UserLogo } from "../../components";
import UserAuth from "./UserAuth/UserAuth.jsx";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

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