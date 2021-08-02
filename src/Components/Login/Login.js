import React from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useContext } from 'react';
import { UserContext } from '../../App';
import './login.css';
import fbIcon from './../../images/facebook-brands.svg';
import ggIcon from './../../images/google-brands.svg';
import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';


export const handleSignOut = () => {
    return firebase.auth().signOut().then(res => {
        const unSignedUser = { name: '', email: '', photo: '', password: '', password2: '', success: false };
        return unSignedUser;
    }).catch(err => console.log(err.message));
}

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

const Login = () => {

    const style1 = { color: 'red', backgroundColor: 'white' };

    const [userInfo, setUserInfo] = useState({ displayName: '', email: '', success: false, password: '', password2: '' });
    const [errorInfo, setErrorInfo] = useState('');
    const [newUser, setNewUser] = useState(true);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: '/' } };


    const google = new firebase.auth.GoogleAuthProvider();
    const facebook = new firebase.auth.FacebookAuthProvider();


    const updateUserName = name => {
        const user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: name,
        }).then(() => {
            //Updated successfully
        }).catch((error) => {
            setErrorInfo(error.message);
        });
    }

    const handleResponse = result => {
        const user = result.user;
        const signedUser = { displayName: user.displayName, email: user.email, success: true };
        setLoggedInUser(signedUser);
        history.replace(from);
    }

    const passAuthenticate = (email, password, newUser, name) => {
        newUser && firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((result) => {
                updateUserName(name);
                const user = result.user;
                const signedUser = { displayName: name, email: user.email, success: true };
                setLoggedInUser(signedUser);
                history.replace(from);
            }).catch((error) => { setErrorInfo(error.message) });

        !newUser && firebase.auth().signInWithEmailAndPassword(email, password)
            .then((result) => {
                handleResponse(result);
            }).catch((error) => { setErrorInfo(error.message) });
    }


    const getLoggedInUser = (provider) => {
        firebase.auth().signInWithPopup(provider).then((result) => {
            handleResponse(result);
        }).catch((error) => { setErrorInfo(error.message) });
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        const newUserInfo = { ...userInfo };
        let valid = true;
        newUserInfo[name] = value;
        if (name === 'email') {
            const isEmailValid = /\S+@\S+\.\S+/.test(value);
            valid = valid && isEmailValid;
            isEmailValid ? setErrorInfo('') : setErrorInfo("Email is not valid");

        }
        if (name === 'password') {
            const isPasswordValid = /\d{1}/.test(value);
            valid = valid && isPasswordValid;
            isPasswordValid ? setErrorInfo('') : setErrorInfo("Your password doesn't contain digits");
        }

        const { password, password2 } = newUserInfo;
        if (newUser && password && password2)newUserInfo.success = (password === password2);
        else if (!newUser && password) newUserInfo.success = valid;
        else newUserInfo.success = false;
        setUserInfo(newUserInfo);
    }


    const handleSubmit = (e) => {
        const { displayName, email, password, success } = userInfo;
        if (success) passAuthenticate(email, password, newUser, displayName);
        else setErrorInfo('Email or Password does not match or exist.')
        e.preventDefault();
    }


    // const { displayName, email, success } = loggedInUser;
    return (
        <div className='App container details'>
            <div className='centered'>
                <h2>Create an account</h2>
                <form onSubmit={handleSubmit}>

                    {newUser && <div><input type="text" id="name" name="displayName" placeholder="Name" onBlur={handleChange} required /><br /><br /></div>}

                    <input type="text" id="email" name="email" placeholder="Username of Email" onBlur={handleChange} required /><br /><br />

                    <input type="password" name="password" id="pass" placeholder='Password' onBlur={handleChange} required /><br /><br />

                    {newUser && <div><input type="password" name="password2" id="pass2" placeholder='Confirm Password' onBlur={handleChange} required /><br /><br /></div>}

                    <input type="submit" value={newUser ? "Create an account" : "Login"} style={{ color: 'white', backgroundColor: 'salmon', border: 'none', borderRadius: '10px', padding: '5px 40px' }} /><br /><br />

                </form>

                {newUser && <div><p>Already have an account? <button onClick={() => setNewUser(false)}>Login</button></p></div>}
                {!newUser && <div><p>Don't have an account? <button onClick={() => setNewUser(true)}>Create an account</button></p></div>}
            </div>
            <button className='loginButton' onClick={() => getLoggedInUser(google)}> <img src={ggIcon} alt='icon' /> Continue with Google</button><br /><br />
            <button className='loginButton' onClick={() => getLoggedInUser(facebook)}><img src={fbIcon} alt='icon' /> Continue with Facebook</button>
            {/* {success && <h2 style={style1}>{displayName} : {email}</h2>} */}
            {!loggedInUser.success && <h2 style={style1}>{errorInfo}</h2>}
        </div>
    );
};

export default Login;