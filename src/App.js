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

function App() {
  return (
    <Router>
      <div>
        <Header/>
        <Switch>

          <Route exact path="/">
            <Home/>
          </Route>

          <Route path="/destination">
            <Destination/>
          </Route>

          <Route path="/blog">
            <Blog />
          </Route>

          <Route path="/contact">
            <Contact/>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>

          <Route path="*">
            <NotFound/>
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
