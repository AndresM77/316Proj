import React from 'react';
import Navbar from './components/layouts/Navbar';
//Import styling
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
//React router Import
import {Switch, Route} from 'react-router-dom';
//Import Pages
import Home from './components/pages/Home';
import News from './components/pages/News';
import Donate from './components/pages/Donate';
import NotFoundPage from './components/pages/NotFoundPage';
import Contacts from './components/pages/Contacts';

function App() {
  return (
  <div>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route path="/news" component={News}/>
      <Route path="/contacts" component={Contacts}/>
      <Route path="/donate" component={Donate}/>
      <Route path="/404" component={NotFoundPage}/>
    </Switch>
  </div>
);
}

export default App;
