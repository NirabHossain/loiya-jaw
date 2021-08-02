import React from 'react';
import { useContext } from 'react';
import { Link } from "react-router-dom";
import { UserContext } from '../../App';
import './Header.css';
const Header = () => {
    const [loggedInUser] = useContext(UserContext);
    console.log(loggedInUser);
    const {displayName, email}=loggedInUser;
    return (
        <header className='App-header row'>
            <div className='title-Name col-md-4'>
            <Link className='text-dark text-decoration-none' to="/"><h1><strong>Loiya Jaw</strong></h1></Link>
            </div>
            <div className='links col-md-6'>
                <Link to="/">Home</Link>
                <Link to="/destination">Destination</Link>
                <Link to="/blog">Blog</Link>
                <Link to="/contact">Contact</Link>
                {!email && <Link to="/login"><button>Login</button></Link>}
                {email && <Link to={`/user/${displayName}`}><span className='text-success bg-white p-1 border border-rounded'>{displayName}</span></Link>}
            </div>

        </header>
    );
};

export default Header;