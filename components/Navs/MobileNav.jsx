import { useContext } from "react";
import RenderIf from "../../reusableComps/RenderIf";
import BgContext from "../../Context/ColourContext";
import ListIcon from "../Svgs/List";
import ToggleSwitch from "../Layout/ToggleSwitch";
import CrossIcon from "../Svgs/CrossIcon";
import { Slide, SlideInDown, SlideInRight } from "react-animated-components";
import NavList from "../../reusableComps/NavList";

const MobileNav = ({
  navOpen,
  handleChangeNav,
  handleCloseNav,
  handleNavOpen,
  navList,
  currentNav,
}) => {
  const { checked, toggleChecked } = useContext(BgContext);
  return (
    <div className="mobileNav">
      <RenderIf isTrue={!navOpen}>
        <div className="containerMobileNav">
          <div className="navIcon">
            <ListIcon width="30" height="30" onClick={handleNavOpen} />
          </div>
          <ToggleSwitch />
        </div>
      </RenderIf>
      <RenderIf isTrue={navOpen}>
        <Slide direction={navOpen ? "down" : "up"} fade={true} out={!navOpen}>
          <div className="loggedInContainer">
            <CrossIcon
              innerFill={checked ? "rgb(26, 24, 24)" : "rgb(218, 213, 213) "}
              height="20"
              width="20"
              onClick={handleCloseNav}
            />
            <NavList
              checked={checked}
              list={navList}
              currentNav={currentNav}
              handleChangeNav={handleChangeNav}
            />
          </div>
        </Slide>
      </RenderIf>
    </div>
  );
};

export default MobileNav;
