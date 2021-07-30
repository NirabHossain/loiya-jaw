import React from 'react';
import { Link } from "react-router-dom";
import './Header.css';
const Header = () => {
    const loggedIn = {name: 'Login'};
    return (
        <header className='App-header'>
            <div className='title-Name'>
                <h1><strong>Loiya Jaw</strong></h1>
            </div>
            <div>
                <Link to="/"><small>Home</small></Link>
                <Link to="/destination"><small>Destination</small></Link>
                <Link to="/blog"><small>Blog</small></Link>
                <Link to="/contact"><small>Contact</small></Link>
                <Link to="/login"><button>{loggedIn.name}</button></Link>
            </div>

        </header>
    );
};

export default Header;