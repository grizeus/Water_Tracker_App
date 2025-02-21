import { Header, Loader } from "components";
import { Suspense } from "react";
import { Outlet, useLocation, matchPath } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SharedLayout = () => {
  const location = useLocation();

  return (
    <>
      {!matchPath("/404", location.pathname) && <Header />}
      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        draggable={false}
        transition={Zoom}
      />
    </>
  );
};

export default SharedLayout;
