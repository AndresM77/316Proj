import React from "react";
import Select from "react-select";

export default class DataTypeSelect extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  handleChange = selectedOption => {
    this.props.handleCategoryChange(selectedOption);
  };

  render() {
    const options = [
      { value: "air", label: "Air Quality" },
      { value: "temp", label: "Temperature" },
      { value: "rain", label: "Rain" }
    ];
    return <Select className="selector" options={options} onChange={this.handleChange} placeholder="Select a metric" />;
  }
}