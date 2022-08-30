import { useContext } from "react"
import BgContext from "../Context/ColourContext"

const useStyles = () => {
    const { checked } = useContext(BgContext)
    const dark = 'rgb(26, 24, 24)'
    const light = 'rgb(218, 213, 213)'
    
    const darkA = 'rgba(26, 24, 24,0.5)'
    const lightA = 'rgba(218, 213, 213,0.5)'

    const lightBorderColor = `1px solid ${darkA}`;
    const darkBorderColor = `1px solid ${lightA}`;

    const borderBottom = () => {
       return checked ? lightBorderColor : darkBorderColor
    }

    const blackOrWhite = () => {
        return checked ? dark:light
    }
    return {
        borderBottom: borderBottom(),
        lightBorderColor,
        darkBorderColor,
        currentColor: blackOrWhite(),
        light,
        dark,
        checked
    }
}

export default useStyles