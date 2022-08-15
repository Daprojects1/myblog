import { useContext } from "react";
import BgContext from "../../Context/ColourContext";
import NavList from "../../reusableComps/NavList";
import ToggleSwitch from "../Layout/ToggleSwitch";

const DesktopNav = ({ currentNav, navList, handleChangeNav }) => {
  const { checked, toggleChecked } = useContext(BgContext);
  return (
    <div className="desktopNav">
      <div className="desktopNavBody">
        <div className="headerList">
          <h2>Blog City</h2>
          <NavList
            isDesktop={true}
            checked={checked}
            handleChangeNav={handleChangeNav}
            currentNav={currentNav}
            list={navList}
            listClasses={"desktopNavList"}
          />
        </div>
        <ToggleSwitch />
      </div>
    </div>
  );
};

export default DesktopNav;
