import React from 'react';
import { Link } from 'react-router-dom'
 
const TopMenu = ()=>{
    return(
        <div>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/tryit">Try It</Link></li>
            <li><Link to="/signin">Sign in</Link></li>
        </div>
    )
}

export default TopMenu;