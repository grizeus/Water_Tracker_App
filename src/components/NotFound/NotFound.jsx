import { NavLink, useNavigate } from 'react-router-dom';
import notFound from 'src/assets/images/notFoundError.png';
import { ErrorBtn, ErrorImg } from './NotFound.styled';
import { useEffect } from 'react';


export const NotFound = () => {
    const navigate = useNavigate();

    useEffect(() => {
    navigate("/404", { replace: true }); // Перенаправлення на /404
    }, [navigate]);
  
  return (
    <>
      <NavLink to="/">
        <ErrorBtn type="button">Go back to Welcome page</ErrorBtn>
      </NavLink>
      <ErrorImg src={notFound} alt="notFound" />
    </>
  );
};
