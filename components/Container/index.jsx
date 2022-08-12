import React, {useContext, useEffect, useState} from 'react';
import ToggleSwitch from './ToggleSwitch'

const Container = ({ children, checked }) => {

    return (  
        <div className="containerBody">
                <ToggleSwitch />
            {children}
        </div>
    );
}
 
export default Container;