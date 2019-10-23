import React, { useState } from "react";
import ReactDOM from "react-dom";
import ReactTooltip from "react-tooltip";
import App from './App'

import "./index.css";

import MapChart from "./components/MapChart";

// function App() {
//   const [content, setContent] = useState("");
//   return (
//     <div>
//       <Navbar />
//       <MapChart setTooltipContent={setContent} />
//       <ReactTooltip>{content}</ReactTooltip>
//     </div>
//   );
// }

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
