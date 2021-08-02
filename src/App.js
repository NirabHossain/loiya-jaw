// import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from './Components/Home/Home';
import Destination from './Components/Destination/Destination';
import Header from './Components/Header/Header';
import NotFound from './Components/NotFound/NotFound';
import Blog from './Components/Blog/Blog';
import Contact from './Components/Contact/Contact';
import Login from './Components/Login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import backGround from './images/Bg.png';
import { useState } from 'react';
import { createContext } from 'react';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import UserDetails from './UserDetails/UserDetails';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <div  style={{ backgroundImage: `url(${backGround})` }} className= 'mainApp'>
    <Router>
      <UserContext.Provider value={[loggedInUser, setLoggedInUser]} style={{ backgroundImage: `url(${backGround})` }} className= 'mainApp'>
        <Header/>
        <Switch>

          <Route exact path="/">
            <Home/>
          </Route>

          <PrivateRoute path="/destination/:vehicle">
            <Destination/>
          </PrivateRoute>

          <PrivateRoute path="/destination">
            <Destination/>
          </PrivateRoute>

          <Route path="/blog">
            <Blog />
          </Route>

          <Route path="/contact">
            <Contact/>
          </Route>

          <Route path="/login">
            <Login></Login>
          </Route>

          <PrivateRoute path='/user/:details'>
            <UserDetails/>
          </PrivateRoute>

          <Route path="*">
            <NotFound/>
          </Route>

        </Switch>
      </UserContext.Provider>
    </Router>
    </div>
  );
}

export default App;
