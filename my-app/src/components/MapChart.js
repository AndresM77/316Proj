import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from "react-simple-maps";
import "../App.css";
import DataTypeSelect from "../components/DataTypeSelect";
import YearSlider from "../components/YearSlider";
import { scaleLinear } from "d3-scale";

export default class MapChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedYear: "",
      selectedCategory: "",
      selectedPoints: []
    };
  }

  minValue = 5; // based on the data array above
  maxValue = 20; // based on the data array above

  customScale = scaleLinear()
  .domain([this.minValue, this.maxValue])
  .range([this.minColor, this.maxColor]);

  componentDidMount() {
    this.setState({ selectedYear: 2015 }, this.filterDataPoints);
  }

  handleYearChange = year => {
    this.setState({ selectedYear: year }, this.filterDataPoints);
  };

  handleCategoryChange = category => {
    this.setState({ selectedCategory: category.value }, this.filterDataPoints);
  };



  handleTooltipContent = (name, measurement) => {
    let display_string =  `${name}: ${measurement}`
    const ending_values = {"rain": " mm", "temp": " °C", "air": " ppm"}
    display_string += ending_values[this.state.selectedCategory]
    return display_string
  }

  filterDataPoints = async() => {
    let points = []
    if(this.state.selectedCategory && this.state.selectedYear) {
      points = await fetch(`https://frank.colab.duke.edu:3002/api/v1/dps/${this.state.selectedCategory}/${this.state.selectedYear}`)
      .catch(e => {
        console.log(e);
        return;
      })
    }
    console.log(this.state.selectedCategory, this.state.selectedYear);
    const json = points.length === 0 ? [] : await points.json();
    this.setState({selectedPoints: json});
  };

  render() {
    let minColor;
    let maxColor;
    if(this.state.selectedCategory === "air"){
      minColor = "#82ed86";
      maxColor = "#CC0617";
    } else if(this.state.selectedCategory === "temp"){
      minColor = "#CFD8DC";
      maxColor = "#C94242";
    } else {
      minColor = "#E66232";
      maxColor = "#214ADE";
    }
    

    return (
      <div>
        <div style={{ position: "absolute", bottom: "10vh", left: "4vw", width: "300px" }}>
          <DataTypeSelect handleCategoryChange={this.handleCategoryChange} />
          {this.state.selectedCategory !== "air" ? <YearSlider
              startYear={1901}
              endYear={2016}
              handleYearChange={this.handleYearChange}
            /> : <> </>}
        </div>
        <div>
          <ComposableMap
            data-tip=""
            projectionConfig={{ scale: 180 }}
            width={980}
            height={500}
            style={{
              width: "100%",
              height: "auto"
            }}
          >
            <ZoomableGroup zoom={1}>
            <Geographies
              geography={
                "https://raw.githubusercontent.com/Frankgeng/react-simple-maps/master/topojson-maps/world-110m.json"
              }
            >
              {({ geographies }) =>
                geographies.map((geo, i) => {
                  const country = this.state.selectedPoints.find(
                    p => p.countryid === geo.properties.ISO_A3
                  );
                  let measurement;
                  if (this.state.selectedCategory === "temp") measurement = "temperature";
                  else if (this.state.selectedCategory === "air") measurement = "quality";
                  else if (this.state.selectedCategory === "rain") measurement = "rainfall";        
                  return (
                    <Geography
                      key={geo.properties.ISO_A3 + i}
                      cacheId={geo.properties.ISO_A3 + i}
                      geography={geo}
                      onMouseEnter={() => {
                        const { NAME } = geo.properties;
                        
                        if(country) this.props.setTooltipContent(this.handleTooltipContent(NAME, country[measurement]));
                      }}
                      onMouseLeave={() => {
                        this.props.setTooltipContent("");
                      }}
                      style={{
                        default: {
                          fill: country
                            ? this.customScale(country[measurement])
                            : "#ECEFF1",
                          stroke: "black",
                          strokeWidth: 0.75,
                          outline: "none"
                        },
                        hover: {
                          fill: country
                            ? this.customScale(country[measurement])
                            : "#ECEFF1",
                          stroke: "black",
                          strokeWidth: 0.75,
                          outline: "none"
                        },
                        pressed: {
                          fill: country
                            ? this.customScale(country[measurement])
                            : "#ECEFF1",
                          stroke: "black",
                          strokeWidth: 0.75,
                          outline: "none"
                        }
                      }}
                    />
                  );
                })
              }
            </Geographies>
            </ZoomableGroup>
          </ComposableMap>
        </div>
      </div>
    );
  }
}
