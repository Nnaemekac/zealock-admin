import type { ReactNode } from "react";
import { useEffect } from "react";
import { Outlet, Navigate } from "react-router";
import { lazyLoadings } from "@richaadgigi/stylexui";
import { isAuthenticated } from "../utils/auth"; // Import your auth utility

type AuthWrapperProps = {
  children?: ReactNode;
};

const AuthWrapper = ({ children }: AuthWrapperProps) => {
  useEffect(() => {
    lazyLoadings();
  }, []);

  // Redirect to dashboard if user is already authenticated
  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <section className="xui-min-h-[100vh] xui-row xui-h-fluid-100">
      <div className="xui-col-12 xui-md-col-7 xui-container xui-py-2 xui-md-py-4">
        {children || <Outlet />}
      </div>
      <div
        className="xui-col-12 xui-md-col-5 xui-bg-light xui-h-auto xui-bg-size-cover xui-bg-position-center-bottom"
        style={{
          backgroundImage: `url('/static/images/banners/blurred/pexels-114877721-28544350.jpg')`,
        }}
        xui-bg-img={"/static/images/banners/pexels-114877721-28544350.jpg"}
      />
    </section>
  );
};

export default AuthWrapper;