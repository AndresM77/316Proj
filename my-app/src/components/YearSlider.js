import React from "react";
import { Slider, Tooltip } from "@material-ui/core";

export default class YearSlider extends React.Component {
  constructor(props) {
    super(props);
    this.ValueLabelComponent = this.ValueLabelComponent.bind(this);
  }

  ValueLabelComponent(props) {
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

  handleYearChange = (event, value) => {
      this.props.handleYearChange(value);
  }

  handleChange = (event, value) => this.value = value;

  render() {
    return (
      <Slider
        ValueLabelComponent={this.ValueLabelComponent}
        min={this.props.startYear}
        max={this.props.endYear}
        defaultValue={this.props.endYear}
        step={1}
        marks={[{ value: this.props.startYear, label: `${this.props.startYear}` },
         { value: this.props.endYear, label: `${this.props.endYear}` }]}
        style={{ color: "#F53" }}
        onChangeCommitted={this.handleYearChange}
      />
    );
  }
}
