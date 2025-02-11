import { NavLink, useNavigate } from 'react-router-dom';
// import notFound from 'src/assets/images/notFoundError.png';
import { ErrorBtn, ErrorPageWrapper, StyledPicture } from './NotFound.styled';
import { useEffect } from 'react';

import mobileNotFound1x from '../../assets/images/notFound/notFoundMob.png';
import mobileNotFound2x from '../../assets/images/notFound/notFoundMob@2x.png';
import tabletNotFound1x from '../../assets/images/notFound/notFoundTab.png';
import tabletNotFound2x from '../../assets/images/notFound/notFoundTab@2x.png';
import desktopNotFound1x from '../../assets/images/notFound/notFoundDesk.png';
import desktopNotFound2x from '../../assets/images/notFound/notFoundDesk@2x.png';



export const NotFound = () => {
    const navigate = useNavigate();

    useEffect(() => {
    navigate("/404", { replace: true }); // Перенаправлення на /404
    }, [navigate]);
  
  return (
    <>
    <ErrorPageWrapper>
      <NavLink to="/">
        <ErrorBtn type="button">Go back to Welcome page</ErrorBtn>
      </NavLink>

      <StyledPicture>
        <picture>
          <source
            srcSet={`${desktopNotFound1x} 1x, ${desktopNotFound2x} 2x`}
            media="(min-width: 1440px)"
          />
          <source
            srcSet={`${tabletNotFound1x} 1x, ${tabletNotFound2x} 2x`}
            media="(min-width: 768px) and (max-width: 1439px)"
          />
          <source
            srcSet={`${mobileNotFound1x} 1x, ${mobileNotFound2x} 2x`}
          />
          <img
            src={mobileNotFound1x}
            srcSet={`${mobileNotFound1x} 1x, ${mobileNotFound2x} 2x`}
            alt="notFound Page"
          />
        </picture>
      </StyledPicture>
    </ErrorPageWrapper>
    </>
  );
};
