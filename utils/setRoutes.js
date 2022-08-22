const setRoutes = (currentNavList) => {
    if (typeof window !== "undefined") {
      const { pathname } = window?.location;
      const navCurr = currentNavList?.find((nav) => nav?.path === pathname);
      if (navCurr) return navCurr?.name;
    }
    return null;
};
  
const loginNavList = [
  { name: "Home", path: "/" },
  { name: "Create A Blog", path: "/create-a-blog" },
  { name: "Profile", path: "/profile" },
  { name: "Logout", path: "/logout" },
];
const loggedOutNav = [
  { name: "Home", path: "/" },
  { name: "Login", path: "/login" },
];

const handleNavList = (user) => {
  return user ? loginNavList : loggedOutNav;
};

const routesConfig = { setRoutes, loginNavList, loggedOutNav, handleNavList }

export default routesConfig