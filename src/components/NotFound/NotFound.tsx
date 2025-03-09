import { NavLink } from "react-router-dom";

import mobileNotFound1x from "../../assets/images/notFound/notFoundMob.png";
import mobileNotFound2x from "../../assets/images/notFound/notFoundMob@2x.png";
import tabletNotFound1x from "../../assets/images/notFound/notFoundTab.png";
import tabletNotFound2x from "../../assets/images/notFound/notFoundTab@2x.png";
import desktopNotFound1x from "../../assets/images/notFound/notFoundDesk.png";
import desktopNotFound2x from "../../assets/images/notFound/notFoundDesk@2x.png";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative flex justify-center">
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
            media="(max-width: 767px)"
          />
          <img src={mobileNotFound1x} alt="notFound Page" />
        </picture>
        <NavLink
          to="/"
          className="absolute -top-4 left-0 flex h-auto w-24 justify-center rounded-lg bg-royal px-3 py-2 text-sm leading-4 text-white shadow-sm transition-shadow duration-300 ease-in-out hover:shadow-lg md:-left-24 md:-top-5 md:w-32 md:px-5 md:py-2.5 md:text-lg md:leading-6 xl:-left-64 xl:top-0">
          Go back
        </NavLink>
      </div>
    </div>
  );
};

export default NotFound;