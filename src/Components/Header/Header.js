import React from 'react';
import { Link } from "react-router-dom";
import './Header.css';
const Header = () => {
    const loggedIn = {name: 'Login'};
    return (
        <header className='App-header'>
            <div className='title-Name'>
                <h1>Loiya Jaw</h1>
            </div>
            <div>
                <Link to="/">Home</Link>
                <Link to="/destination">Destination</Link>
                <Link to="/blog">Blog</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/login"><button>{loggedIn.name}</button></Link>
            </div>

        </header>
    );
};

export default Header;