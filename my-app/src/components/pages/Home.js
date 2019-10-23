import React, { Component, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../layouts/Navbar';
import ReactDOM from "react-dom";
import ReactTooltip from "react-tooltip";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import '../../App.css';
import MapChart from "../MapChart";
import "../../index.css";

class Home extends Component {
  render() {
    const [content, setContent] = useState("");
    return (
      <div>
        <MapChart setTooltipContent={setContent} />
        <ReactTooltip>{content}</ReactTooltip>
      </div>
    );
  }
}

export default Home;
