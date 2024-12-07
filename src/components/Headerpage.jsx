
import React from 'react'
import './navigation.css'
import Logo from './Collagelogo.png';
const Header = () => {
    return (
        <div>
            <header>
                <div className="left">
                    <img src={Logo} alt="logo" />
                </div>
                <div className="right">
                    <nav>
                        <ul>
                            <li><a href="" className="home">Home</a></li>
                            <li><a href="" className="contactus">Contact Us</a></li>
                            <button>Admin</button>
                        </ul>
                    </nav>
                </div>
            </header>
        </div>
    )
}

export default Header
