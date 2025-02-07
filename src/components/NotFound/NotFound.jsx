import { NavLink } from 'react-router-dom';
import notFound from 'src/assets/images/notFound.png';
import { ErrorBtn, ErrorImg } from './NotFound.styled';


export const NotFound = () => {
  
  return (
    <>
      <NavLink to="/">
        <ErrorBtn type="button">Go back to Welcome page</ErrorBtn>
      </NavLink>
      <ErrorImg src={notFound} alt="notFound" />
    </>
  );
};
