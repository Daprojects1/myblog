import { useRouter } from "next/router";
import { useContext } from "react";
import BgContext from "../../Context/ColourContext";
import NavList from "../../reusableComps/NavList";
import RenderMounted from "../../reusableComps/RenderMounted";
import ToggleSwitch from "../Layout/ToggleSwitch";

const DesktopNav = ({ currentNav, navList, handleChangeNav }) => {
  const { checked, toggleChecked } = useContext(BgContext);
  const router = useRouter();
  return (
    <div className="desktopNav">
      <div className="desktopNavBody">
        <div className="headerList">
          <h2 onClick={() => router.push("/")} className="cursor">
            Blog City
          </h2>
          <RenderMounted>
            <NavList
              isDesktop={true}
              checked={checked}
              handleChangeNav={handleChangeNav}
              currentNav={currentNav}
              list={navList}
              listClasses={"desktopNavList"}
            />
          </RenderMounted>
        </div>
        <ToggleSwitch />
      </div>
    </div>
  );
};

export default DesktopNav;
