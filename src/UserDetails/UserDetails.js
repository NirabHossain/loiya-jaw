import React from 'react';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../App';
import { handleSignOut } from '../Components/Login/Login';

const UserDetails = () => {
  const [loggedInUser, setLoggedInUser]=useContext(UserContext);
  const {details} = useParams();

  const signOut = () =>{
    handleSignOut().then(res=>{
      setLoggedInUser(res);
    }).catch(err=>{
      console.log(err.message);
    })
  }

  return (
    <div>
      <h1>This is user details of {details}</h1>
      <button className='btn btn-warning m-5 p-2' onClick={signOut} >Sign Out</button>
    </div>
  );
};

export default UserDetails;