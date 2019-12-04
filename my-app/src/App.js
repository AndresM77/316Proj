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

class App extends Component{
  render() {
    return(
      <div>
        <Navbar/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/news" component={News}/>
          <Route path="/contacts" component={Contacts}/>
          <Route path="/campaign" component={Campaign}/>
          <Route path="/404" component={NotFoundPage}/>
        </Switch>
        <footer>Made with 🌎 by Adam, Ryan, Joe, Andres, Ethan, and Frank</footer>
    </div>
  );
  }
}

export default App;
