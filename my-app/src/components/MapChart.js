import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";
import "../App.css";
import DataTypeSelect from "../components/DataTypeSelect"
import YearSlider from "../components/YearSlider";

export default class MapChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      geoUrl:
        "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json",
      selectedYear: ""
    };
  }

  componentDidMount() {
    this.setState({
      selectedYear: 2010
    })

  }

  handleYearChange = (year) => {
    this.setState({
      selectedYear: year
    })
  }

  testData = [
    {coordinates: [-74.006, 40.7128], year: 2015, city: "Boston", temperature: "33C"},
    {coordinates: [-64, 45], year: 1900, city: "Random City", temperature: "20C"}
  ]

  render() {
    return (
      <div>
        <div style={{ position: "absolute", bottom: "100px", width: "300px" }}>
          <DataTypeSelect />
          <YearSlider startYear={1900} endYear={2015} handleYearChange={this.handleYearChange}/>
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
            <Geographies geography={this.state.geoUrl}>
              {({ geographies }) =>
                geographies.map(geo => (
                  <Geography key={geo.rsmKey} geography={geo} />
                ))
              }
            </Geographies>
            {this.testData.map(point => (
              point.year === this.state.selectedYear ? <Marker
                coordinates={point.coordinates}
                onMouseEnter={() => {
                  this.props.setTooltipContent(`${point.city}- Temperature: ${point.temperature}`);
                }}
                onMouseLeave={() => {
                  this.props.setTooltipContent("");
                }}>
                <circle r={8} fill="#F53"/>
              </Marker> : null
            ))}
          </ComposableMap>
        </div>
      </div>
    );
  }
}
