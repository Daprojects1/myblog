import { useContext } from "react";
import RenderIf from "../../reusableComps/RenderIf";
import BgContext from "../../Context/ColourContext";
import ListIcon from "../Svgs/List";
import ToggleSwitch from "../Layout/ToggleSwitch";
import CrossIcon from "../Svgs/CrossIcon";
import { Slide, SlideInDown, SlideInRight } from "react-animated-components";

const MobileNav = ({
    navOpen,
    handleChangeNav,
    handleCloseNav,
    handleNavOpen,
    loginNavList,
    currentNav }) => {
    
    const { checked, toggleChecked } = useContext(BgContext)
    const lightBorder = '1px solid rgb(26, 24, 24)'
    const darkBorder = '1px solid rgb(218, 213, 213)'
    return ( 
        <div className="mobileNav">
             <RenderIf isTrue={!navOpen}>
              <div className='containerNav'>
                <div className='navIcon'>    
                    <ListIcon width='30' height='30' onClick={handleNavOpen} />
                </div>
                    <ToggleSwitch/>
             </div>
            </RenderIf>
            <RenderIf isTrue={navOpen}>
                <Slide direction={navOpen ? 'down' : 'up'} fade={true} out={!navOpen}>
                <div className='loggedInContainer'> 
                      <CrossIcon
                        innerFill={checked ? 'rgb(26, 24, 24)' : 'rgb(218, 213, 213) '}
                        height='20'
                         width='20'
                        onClick={handleCloseNav}
                       />
                    <ul>
                        {loginNavList?.map((item,indx) => <li
                            style={{
                                borderBottom: checked ? lightBorder : darkBorder,
                                color: currentNav === item ? 'rgb(79, 75, 172)' : ''
                            }}
                            key={indx}
                            onClick={()=>handleChangeNav(item)}>
                            {item}</li>)}
                    </ul>
                </div>
                </Slide>
            </RenderIf>
        </div>
     );
}
 
export default MobileNav;