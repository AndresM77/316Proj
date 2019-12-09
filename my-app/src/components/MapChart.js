import React from "react";
import {
  Marker,
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from "react-simple-maps";
import "../App.css";
import DataTypeSelect from "../components/DataTypeSelect";
import YearSlider from "../components/YearSlider";
let d3 = require("d3");
// import { scaleLog, scaleLinear, scaleSqrt } from "d3-scale";

export default class MapChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedYear: "",
      selectedCategory: "",
      selectedPoints: []
    };
  }

  // minValue = 5; // based on the data array above
  // maxValue = 20; // based on the data array above

  // customScale = scaleLinear()
  // .domain([this.minValue, this.maxValue])
  // .range([this.state.minColor, this.maxColor]);

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
    const json = points.length === 0 ? [] : await points.json();
    this.setState({selectedPoints: json});
  }
  
    render() {
      let minValue = 5; // based on the data array above
      let maxValue = 20; // based on the data array above
      let minColor;
      let maxColor;
      let mediumColor;
      let mediumValue;
      let customScale;

      if(this.state.selectedCategory === "air"){
        minColor = "#12b819";
        mediumColor= "#fff200";
        maxColor = "#CC0617";
        minValue = 0;
        mediumValue = 50;
        maxValue = 800;
        customScale = d3.scaleLinear()
        .domain([minValue, mediumValue, maxValue])
        .range([minColor, mediumColor, maxColor]);
      } else if(this.state.selectedCategory === "temp"){
        minColor = "#00bfff";
        maxColor = "#f73b3b";
        minValue = -20;
        maxValue = 30;
        customScale = d3.scaleSequential()
        .domain([35, -20])
        .interpolator(d3.interpolateRdBu);
        // .range([minColor, maxColor]);
      } else {
        minColor = "#ff4d0d";
        mediumColor = "#ffbfa8";
        maxColor = "#1447ff";
        minValue = 0;
        mediumValue = 35;
        maxValue = 275;
        customScale = d3.scaleLinear()
        .domain([minValue, mediumValue, maxValue])
        .range([minColor, mediumColor, maxColor]);
      }
  

    // const customScale = scaleLinear()
    // .domain([minValue, mediumValue, maxValue])
    // .range([minColor, mediumColor, maxColor]);
  
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
                              ? customScale(country[measurement])
                              : "#ECEFF1",
                            stroke: "black",
                            strokeWidth: 0.75,
                            outline: "none"
                          },
                          hover: {
                            fill: country
                              ? customScale(country[measurement])
                              : "#ECEFF1",
                            stroke: "black",
                            strokeWidth: 0.75,
                            outline: "none"
                          },
                          pressed: {
                            fill: country
                              ? customScale(country[measurement])
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
              {this.state.selectedCategory === "air" ? this.state.selectedPoints.map((element, i) => {
                    return(
                      <Marker key={i} coordinates={[element.lng, element.lat]}
                        onMouseEnter={() => {
                          this.props.setTooltipContent(`${element.quality} AQI`);
                        }}
                        onMouseLeave={() => {
                          this.props.setTooltipContent("");
                        }}>
                        <circle r={2} fill={customScale(element.quality)} />
                      </Marker>
                    )}) : <> </>}
              </ZoomableGroup>
            </ComposableMap>
          </div>
        </div>
      );
    }
  }