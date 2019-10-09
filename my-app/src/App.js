import React from 'react';
import { ComposableMap, Geographies, Geography } from "react-simple-maps";import './App.css';


const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

function App() {
  return (
    <div>
    <ComposableMap height="440">
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map(geo => <Geography key={geo.rsmKey} geography={geo} />)
        }
      </Geographies>
    </ComposableMap>
  </div>
  );
}

export default App;
