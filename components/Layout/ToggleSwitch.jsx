import { useContext } from "react";
import BgContext from "../../Context/ColourContext";
import Toggle from "react-toggle";
import SunIcon from "../Svgs/SunIcon";
import MoonIcon from "../Svgs/MoonIcon";
import RenderMounted from "../../reusableComps/RenderMounted";
import "react-toggle/style.css";

const ToggleSwitch = () => {
  const { checked, toggleChecked } = useContext(BgContext);

  return (
    <div className="toggleSwitch">
      <RenderMounted>
        <Toggle
          checked={checked}
          onChange={toggleChecked}
          icons={{
            checked: <SunIcon width="15" />,
            unchecked: <MoonIcon width="15" />,
          }}
        />
      </RenderMounted>
    </div>
  );
};

export default ToggleSwitch;
