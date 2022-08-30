const setRoutes = (currentNavList) => {
    if (typeof window !== "undefined") {
      const { pathname } = window?.location;
      const navCurr = currentNavList?.find((nav) => nav?.path === pathname);

      if (navCurr) return navCurr?.name;
    }
};
  
const loginNavList = [
  { name: "Home", path: "/" },
  { name: "Create A Blog", path: "/create-a-blog" },
  { name: "Logout", path: "/logout" },
];
const loggedOutNav = [
  { name: "Home", path: "/" },
  { name: "Login", path: "/login" },
  // { name: "Register", path: "/register" },
];

const allPaths = [...loginNavList, ...loggedOutNav].map(p => {
  return p.path
})
const handleNavList = (user) => {
  return user ? loginNavList : loggedOutNav;
};

const routesConfig = { setRoutes, loginNavList, loggedOutNav, handleNavList, allPaths}

export default routesConfig