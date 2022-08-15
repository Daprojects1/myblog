import React, { useContext, useState } from "react";
import MobileNav from "../Navs/MobileNav";
import DesktopNav from "../Navs/DesktopNav";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [currentNav, setCurrentNav] = useState("Home");
  const [isLoggedin, setIsLoggedIn] = useState(false);

  const handleNavClick = () => {
    setOpen((prev) => !prev);
  };

  const handleChangeNav = (navName, path) => {
    if (currentNav !== navName) {
      setCurrentNav(navName);
      router.push(path);
    }
  };

  const handleCloseNav = () => {
    setOpen(false);
  };

  // Add news later

  const loginNavList = [
    { name: "Home", path: "/" },
    { name: "Create A Blog", path: "" },
    { name: "Profile", path: "" },
    { name: "Logout", path: "" },
  ];
  const loggedOutNav = [
    { name: "Home", path: "/" },
    { name: "Login", path: "/login" },
  ];

  return (
    <div className="containerBody">
      <MobileNav
        navOpen={open}
        handleChangeNav={handleChangeNav}
        handleCloseNav={handleCloseNav}
        handleNavOpen={handleNavClick}
        loginNavList={loggedOutNav}
        currentNav={currentNav}
      />
      <DesktopNav
        handleChangeNav={handleChangeNav}
        navList={loggedOutNav}
        currentNav={currentNav}
      />
      {children}
    </div>
  );
};

export default Layout;
