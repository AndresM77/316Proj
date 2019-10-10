import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";
import "./App.css";
import { Slider, Tooltip, Select, MenuItem } from "@material-ui/core";
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
  
  const [values, setValues] = React.useState({
    category: "",
    name: ""
  });

  const handleChange = event => {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value
    }));
  };

  return (
    <div>
      <div style={{ position: "absolute", bottom: "100px", width: "300px" }}>
        <Select
          value={values.category}
          onChange={handleChange}
          style={{ width: "inherit", marginBottom: "30px" }}
          inputProps={{
            name: 'category',
            id: 'category-simple',
          }}
        >
          <MenuItem value={1}>Temperature</MenuItem>
          <MenuItem value={2}>Air Pollution</MenuItem>
        </Select>
        <Slider
          ValueLabelComponent={ValueLabelComponent}
          min={1900}
          max={2015}
          defaultValue={2015}
          step={1}
          marks={[
            { value: 1900, label: "1900" },
            { value: 2015, label: "2015" }
          ]}
          style={{ color: "#F53" }}
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
