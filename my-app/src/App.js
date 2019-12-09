import React, {Component} from 'react';
import Navbar from './components/layouts/Navbar';
//Import styling
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
//React router Import
import {Switch, Route} from 'react-router-dom';
//Import Pages
import Home from './components/pages/Home';
import News from './components/pages/News';
import Campaign from './components/pages/Campaign';
import NotFoundPage from './components/pages/NotFoundPage';
import Contacts from './components/pages/Contacts';
import SignUp from './components/pages/Signup';
import Login from './components/pages/Login';
import AddCampaign from "./components/pages/AddCampaign";

class App extends Component{
  render() {
    return(
      <div>
      <div className="wrapper">
        <Navbar/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/news" component={News}/>
          <Route path="/contacts" component={Contacts}/>
          <Route path="/signup" component={SignUp}/>
          <Route path="/login" component={Login}/>
          <Route path="/campaign" component={Campaign}/>
          <Route path="/404" component={NotFoundPage}/>
          <Route path="/addcampaign" component={AddCampaign}/>
        </Switch>
      </div>
        <footer>Made with <span role="img" aria-label="earth">🌎</span> by Adam, Ryan, Joe, Andres, Ethan, and Frank</footer>
      </div>
  );
  }
}

export default App;
