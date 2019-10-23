import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/layouts/Navbar';
import ReactDOM from "react-dom";
import ReactTooltip from "react-tooltip";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";import './App.css';
import MapChart from "./components/MapChart";
import "./index.css";

class Home extends Componenet {
  render() {
    return (
      <div>
        <MapChart setTooltipContent={setContent} />
        <ReactTooltip>{content}</ReactTooltip>
      </div>
    );
  }
}

export default Home;
