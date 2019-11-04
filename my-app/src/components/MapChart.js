import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
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
      points: this.data,
      selectedPoints: []
    };
  }

  data = [
    { id: 1, country: "USA", name: "United States", val: 10, category: "rain", year: 2015},
    { id: 2, country: "USA", name: "United States", val: 15, category: "temp", year: 2015},
    { id: 3, country: "USA", name: "United States", val: 1, category: "rain", year: 1900},
    { id: 4, country: "USA", name: "United States", val: 4, category: "temp", year: 1900},
    { id: 5, country: "RUS", name: "Russia", val: 16 },
    { id: 6, country: "ISR", name: "Israel", val: 5 }
  ];

  minValue = 5; // based on the data array above
  maxValue = 16; // based on the data array above

  minColor = "#CFD8DC";
  maxColor = "#37474F";

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

  filterDataPoints = () => {
    const filteredByYear = this.filterByYear(this.state.points);
    const filteredByYearAndCategory = this.filterByCategory(filteredByYear);
    this.setState({
      selectedPoints: filteredByYearAndCategory
    });
  };

  filterByCategory = points => {
    return points.filter(
      point => point.category === this.state.selectedCategory
    );
  };

  filterByYear = points => {
    return points.filter(point => point.year === this.state.selectedYear);
  };

  render() {
    return (
      <div>
        <div style={{ position: "absolute", bottom: "130px", width: "300px" }}>
          <DataTypeSelect handleCategoryChange={this.handleCategoryChange} />
          <YearSlider
            startYear={1900}
            endYear={2015}
            handleYearChange={this.handleYearChange}
          />
        </div>
        <div>
          <ComposableMap
            data-tip=""
            projectionConfig={{ scale: 200 }}
            width={980}
            height={500}
            style={{
              marginTop: "10px",
              width: "100%",
              height: "auto"
            }}
          >
            <Geographies
              geography={
                "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"
              }
            >
              {({ geographies }) =>
                geographies.map((geo, i) => {
                  const country = this.state.selectedPoints.find(
                    p => p.country === geo.properties.ISO_A3
                  );
                  return (
                    <Geography
                      key={geo.properties.ISO_A3 + i}
                      cacheId={geo.properties.ISO_A3 + i}
                      geography={geo}
                      onMouseEnter={() => {
                        const { NAME } = geo.properties;
                        if(country) this.props.setTooltipContent(`${NAME} - ${country.val}`);
                      }}
                      onMouseLeave={() => {
                        this.props.setTooltipContent("");
                      }}
                      style={{
                        default: {
                          fill: country
                            ? this.customScale(country.val)
                            : "#ECEFF1",
                          stroke: "#FFF",
                          strokeWidth: 0.75,
                          outline: "none"
                        },
                        hover: {
                          fill: country
                            ? this.customScale(country.val)
                            : "#ECEFF1",
                          stroke: "#FFF",
                          strokeWidth: 0.75,
                          outline: "none"
                        },
                        pressed: {
                          fill: country
                            ? this.customScale(country.val)
                            : "#ECEFF1",
                          stroke: "#FFF",
                          strokeWidth: 0.75,
                          outline: "none"
                        }
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
        </div>
      </div>
    );
  }
}
