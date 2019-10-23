import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/layouts/Navbar';
import ReactDOM from "react-dom";
import ReactTooltip from "react-tooltip";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";import './App.css';
import MapChart from "./components/MapChart";
import "./index.css";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

function App() {
  const [content, setContent] = useState("");
  return (
  <div>
    <Navbar />
    <MapChart setTooltipContent={setContent} />
    <ReactTooltip>{content}</ReactTooltip>
  </div>
);
}

export default App;
