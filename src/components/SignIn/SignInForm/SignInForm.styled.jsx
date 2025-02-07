import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

const accentColor = '#407BFF';
const secondaryYellowColor = '#FFC107';

export const SignInLink = styled(NavLink)`
  width: 100%;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  color: ${accentColor};
  &:hover {
    color: ${secondaryYellowColor};
  }
`;
