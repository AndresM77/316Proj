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
      selectedYear: "",
      selectedCategory: "",
      points: this.testData,
      selectedPoints: []
    };
  }

  testData = [
    {id: 1, coordinates: [74.006, 40.7128], year: 2015, category: "temp", city: "Boston", measurement: "33C"},
    {id: 2, coordinates: [64, 45], year: 1900, category: "temp", city: "Random City", measurement: "20C"},
    {id: 3, coordinates: [-74.006, 40.7128], year: 2015, category: "air", city: "Boston", measurement: "100PPM"},
    {id: 4, coordinates: [-64, 45], year: 1900, category: "air", city: "Random City", measurement: "30PPM"}
  ]

  componentDidMount() {
    this.setState({selectedYear: 2015}, this.filterDataPoints)
  }

  handleYearChange = (year) => {
    this.setState({selectedYear: year}, this.filterDataPoints)
  }

  handleCategoryChange = (category) => {
    this.setState({selectedCategory: category.value}, this.filterDataPoints)
  }

  filterDataPoints = () => {
    const filteredByYear = this.filterByYear(this.state.points);
    const filteredByYearAndCategory = this.filterByCategory(filteredByYear);
    this.setState({
      selectedPoints: filteredByYearAndCategory
    })
  }

  filterByCategory = (points) => {
    return points.filter(point => point.category === this.state.selectedCategory);
  }

  filterByYear = (points) => {
    return points.filter(point => point.year === this.state.selectedYear)
  }

  render() {
    return (
      <div>
        <div style={{ position: "absolute", bottom: "130px", width: "300px" }}>
          <DataTypeSelect handleCategoryChange={this.handleCategoryChange}/>
          <YearSlider startYear={1900} endYear={2015} handleYearChange={this.handleYearChange}/>
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
            <Geographies geography={"https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"}>
              {({ geographies }) =>
                geographies.map(geo => (
                  <Geography key={geo.rsmKey} geography={geo} />
                ))
              }
            </Geographies>
            {this.state.selectedPoints.map(point => (
              <Marker
                key={point.id}
                coordinates={point.coordinates}
                onMouseEnter={() => {
                  this.props.setTooltipContent(`${point.city}- ${point.measurement}`);
                }}
                onMouseLeave={() => {
                  this.props.setTooltipContent("");
                }}>
                <circle r={8} fill="#F53"/>
              </Marker>
            ))}
          </ComposableMap>
        </div>
      </div>
    );
  }
}
