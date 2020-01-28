import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import TopMenu from './TopMenu'
import Logo from '../images/blur.svg'

class Navbar extends Component {
    render() {
        return (
            <div className="navbar-fixed">
                <nav className="white" role="navigation">
                    <div className="nav-wrapper container">
                        <Link to="/" className="brand-logo"><img className="responsive-img" src={Logo} width="64px" height="auto" /></Link>
                        <ul className="right hide-on-med-and-down">
                            <TopMenu />
                        </ul>
                        <ul id="nav-mobile" className="sidenav">
                            <TopMenu />
                        </ul>
                        <Link to="/" data-target="nav-mobile" className="sidenav-trigger"><i className="material-icons">menu</i></Link>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navbar;