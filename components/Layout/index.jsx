import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import MobileNav from "../Navs/MobileNav";
import DesktopNav from "../Navs/DesktopNav";
import routesConfig from "../../utils/setRoutes";
import { useRouter } from "next/router";
import useAuthContext from "../../hooks/Auth/useAuthContext";
import useLogout from "../../hooks/Auth/useLogout";

const { handleNavList, setRoutes, allPaths } = routesConfig;
const Layout = ({ children }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const [currentNav, setCurrentNav] = useState(() => {
    return setRoutes(handleNavList(user));
  });

  useEffect(() => {
    // gets the currrent nav list when logged in or out.
    if (typeof window !== "undefined") {
      const navList = handleNavList(user);
      const currentNavObj = setRoutes(navList);

      const NAV = navList?.find((n) => n.name === currentNavObj);

      if (NAV) {
        setCurrentNav(NAV.name);
      }
      const acceptablePaths = ["/blogs/[id]", "/register"];
      if (acceptablePaths.find((p) => p === router.pathname)) {
        setCurrentNav("");
        return;
      }

      if (!NAV) {
        if (!allPaths.includes(router.pathname)) router.push("/");
        return;
      }
    }
  }, [router, user]);

  const handleNavClick = () => {
    setOpen((prev) => !prev);
  };

  const handleChangeNav = (navName, path) => {
    if (path === "/logout") {
      logout();
      router.push("/login");
      return;
    }
    if (currentNav !== navName) {
      setCurrentNav(navName);
      router.push(path);
    }
  };

  const handleCloseNav = () => {
    setOpen(false);
  };

  // Add news later

  return (
    <div className="containerBody">
      <MobileNav
        navOpen={open}
        handleChangeNav={handleChangeNav}
        handleCloseNav={handleCloseNav}
        handleNavOpen={handleNavClick}
        navList={handleNavList(user)}
        currentNav={currentNav}
      />
      <DesktopNav
        handleChangeNav={handleChangeNav}
        navList={handleNavList(user)}
        currentNav={currentNav}
      />
      {children}
    </div>
  );
};

export default Layout;
