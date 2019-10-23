import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/layouts/Navbar';
import ReactDOM from "react-dom";
import ReactTooltip from "react-tooltip";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";import './App.css';
import MapChart from "./components/MapChart";
import "./index.css";
//React router Import
import {Switch, Route} from 'react-router-dom';
//Import Pages
import Home from './components/pages/Home';
import News from './components/pages/News';
import Donate from './components/pages/Donate';
import NotFoundPage from './components/pages/NotFoundPage';
import Contacts from './components/pages/Contacts';


const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

function App() {
  const [content, setContent] = useState("");
  return (
  <div>
    <Navbar />
    <Switch>
      <Route path="/home" component={Home}/>
      <Route path="/news" component={News}/>
      <Route path="/contacts" component={Contacts}/>
      <Route path="/donate" component={Donate}/>
      <Route path="/404" component={NotFoundPage}/>
    </Switch>
    <MapChart setTooltipContent={setContent} />
    <ReactTooltip>{content}</ReactTooltip>
  </div>
);
}

export default App;
