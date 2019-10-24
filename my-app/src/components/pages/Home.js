import React, { Component} from 'react';
import ReactTooltip from "react-tooltip";
import MapChart from "../MapChart";

class Home extends Component {

  constructor() {
    super();
    this.state = {
      content: ""
    }

    this.setContent = this.setContent.bind(this);
  }

  setContent(newContent) {
    this.setState({
      content: newContent
    })
  }

  render() {
    return (
      <div>
        <MapChart setTooltipContent={this.setContent} />
        <ReactTooltip>{this.state.content}</ReactTooltip>
      </div>
    );
  }
}

export default Home;
