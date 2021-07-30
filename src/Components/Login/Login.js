import React from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useContext } from 'react';
import { UserContext } from '../../App';
import './login.css'

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const google = new firebase.auth.GoogleAuthProvider();
    const facebook = new firebase.auth.FacebookAuthProvider();





    const getLoggedInUser = (provider) => {
        firebase.auth().signInWithPopup(provider).then((result) => {
            const user = result.user;
            const signedUser = { name: user.displayName, email: user.email, success: true };
            setLoggedInUser(signedUser);
        }).catch((error) => { console.log(error.code, error.message) });

    }

    const { name, email, success } = loggedInUser;
    return (
        <div className='App container details'>
            <div className='centered'>
                <h2>Create an account</h2>
                <form action="/action_page.php">
                    <label for="fname">First Name</label><br />
                    <input type="text" id="fname" name="firstname" placeholder="Name" /><br />

                    <label for="lname">Last Name</label><br />
                    <input type="text" id="lname" name="lastname" placeholder="Your last name.." /><br />

                    <input type="submit" value="Submit" />
                </form>
            </div>
            <button onClick={() => getLoggedInUser(google)}>Continue with Google</button><br />
            <button onClick={() => getLoggedInUser(facebook)}>Continue with Facebook</button>
            {/* {success && <h2>{name} : {email}</h2>} */}
        </div>
    );
};

export default Login;