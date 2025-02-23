import { FC } from "react"; 
import { useSelector } from "react-redux";

import { Container, Logo, UserLogo } from "../../components";
import { UserAuth } from './UserAuth/UserAuth.jsx';

import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { RootState } from '../../redux/store';

import styles from "./Header.module.css";

export const Header: FC = () => {
  const isLoggedIn = useSelector((state: RootState) => selectIsLoggedIn(state));

  return (
    <header>
      <Container>
        < div className={styles.containerHeader}>
          <Logo />
          {isLoggedIn ? <UserLogo /> : <UserAuth />}
        </div>
      </Container>
    </header>
  );
};