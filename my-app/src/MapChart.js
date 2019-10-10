import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";
import "./App.css";
import Slider from "@material-ui/core/Slider";
import Tooltip from "@material-ui/core/Tooltip";
import "./App.css";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  const popperRef = React.useRef(null);
  React.useEffect(() => {
    if (popperRef.current) {
      popperRef.current.update();
    }
  });

  return (
    <Tooltip
      PopperProps={{
        popperRef
      }}
      open={open}
      enterTouchDelay={0}
      placement="top"
      title={value}
    >
      {children}
    </Tooltip>
  );
}

const MapChart = ({ setTooltipContent }) => {
  return (
    <div>
      <div style={{position:"absolute", bottom:"100px"}}>
        <Slider
          ValueLabelComponent={ValueLabelComponent}
          min={1900}
          max={2015}
          defaultValue={2015}
          step={1}
          marks={[{ value: 1900, label: "1900" }, { value: 2015, label: "2015" }]}
          style={{color: "#F53", width: "300px"}}
        />
      </div>
      <div>
        <ComposableMap
          data-tip=""
          projectionConfig={{ scale: 200 }}
          width={980}
          height={551}
          style={{
            width: "100%",
            height: "auto"
          }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography key={geo.rsmKey} geography={geo} />
              ))
            }
          </Geographies>
          <Marker
            coordinates={[-74.006, 40.7128]}
            onMouseEnter={() => {
              setTooltipContent("Boston- Temperature: 33C");
            }}
            onMouseLeave={() => {
              setTooltipContent("");
            }}
          >
            <circle r={8} fill="#F53" />
          </Marker>
        </ComposableMap>
      </div>
    </div>
  );
};

export default MapChart;
