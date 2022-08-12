import { useContext, useState,useEffect} from 'react';
import BgContext from '../../Context/ColourContext';
import Toggle from 'react-toggle';
import SunIcon from '../Svgs/SunIcon';
import MoonIcon from '../Svgs/MoonIcon'
import "react-toggle/style.css"

const ToggleSwitch = ({ }) => {    
    // change so that it can be persisted from local storage instead. 
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    },[])
    
    const {checked,toggleChecked} = useContext(BgContext)
    
    if (mounted === false) return
    
    return ( 
        <div className='toggleSwitch'>
        <Toggle
            checked={checked}
            onChange={toggleChecked}
            icons={
                {
                    checked: <SunIcon />,
                    unchecked:<MoonIcon/>
                }
            }
        />
    </div>
     );
}
 
export default ToggleSwitch;