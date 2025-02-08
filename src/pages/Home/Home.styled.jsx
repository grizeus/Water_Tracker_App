import styled from '@emotion/styled';

import imgHomeMobile1x from '../../assets/images/background/homePage/mobile/bubbleMob.png';
import imgHomeMobile2x from '../../assets/images/background/homePage/mobile/bubbleMob@2x.png';
import imgHomeTablet1x from '../../assets/images/background/homePage/tablet/bubbleTablet.png';
import imgHomeTablet2x from '../../assets/images/background/homePage/tablet/bubbleTablet@2x.png';
import imgHomeDesktop1x from '../../assets/images/background/homePage/desktop/bubbleDesk.png';
import imgHomeDesktop2x from '../../assets/images/background/homePage/desktop/bubbleDesk@2x.png';

export const Section = styled.section`
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100vh;

  background-image: -webkit-image-set(
    url(${imgHomeMobile1x}) 1x,
    url(${imgHomeMobile2x}) 2x
  );
  background-image: image-set(
    url(${imgHomeMobile1x}) 1x,
    url(${imgHomeMobile2x}) 2x
  );

  @media screen and (min-width: 768px) and (max-width: 1439px) {
    background-image: -webkit-image-set(
      url(${imgHomeTablet1x}) 1x,
      url(${imgHomeTablet2x}) 2x
    );
    background-image: image-set(
      url(${imgHomeTablet1x}) 1x,
      url(${imgHomeTablet2x}) 2x
    );
  }

  @media screen and (min-width: 1440px) {
    background-image: -webkit-image-set(
    url(${imgHomeDesktop1x}) 1x,
    url(${imgHomeDesktop2x}) 2x
  );
  background-image: image-set(
    url(${imgHomeDesktop1x}) 1x,
    url(${imgHomeDesktop2x}) 2x
  }
`;

export const Container = styled.div``;
