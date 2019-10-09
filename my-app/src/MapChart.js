import React from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";import './App.css';
import "./App.css"


const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const MapChart = ({ setTooltipContent }) => {  return (
    <div>
      <ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map(geo => <Geography key={geo.rsmKey} geography={geo}
            />)
          }
        </Geographies>
        <Marker coordinates={[-74.006, 40.7128]} onMouseEnter={() => {

              setTooltipContent("Temperature: 33C");
            }}
            onMouseLeave={() => {
              setTooltipContent("");
            }}>
            <circle r={8} fill="#F53"/>
        </Marker>
    </ComposableMap>
  </div>
  );
}

export default MapChart;
