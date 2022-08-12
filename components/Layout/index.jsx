import React, { useContext, useState } from 'react';
import MobileNav from '../MobileNav';

const Layout = ({ children }) => {
    const [open, setOpen] = useState(false)
    const [currentNav, setCurrentNav] = useState('Home')
    const [isLoggedin, setIsLoggedIn] = useState(false) 

    const handleNavClick = () => {
        setOpen(prev => !prev)
    }

    const handleChangeNav = (navName) => {
        if (currentNav !== navName) {
            setCurrentNav(navName)
        }
    }

    const handleCloseNav = () => {
        setOpen(false)
    }
    // Add news later
    const loginNavList = ['Home', 'Create A Blog','Logout']
    const loggedOutNav = ['Home', 'Login']
    

    return (  
        <div className="containerBody">
              <MobileNav
                navOpen={open}
                handleChangeNav={handleChangeNav}
                handleCloseNav={handleCloseNav}
                handleNavOpen={handleNavClick}
                loginNavList={loginNavList}
                currentNav={currentNav}
              />
            {children}
        </div>
    );
}
 
export default Layout;