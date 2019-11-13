import React, { Component } from 'react';

class Donate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }
  componentDidMount() {
    fetch("https://api.reliefweb.int/v1/reports?appname=apidoc&limit=2")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            disasters: result.data
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, disasters } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {disasters.map(disaster => (
            <li key={disaster.title}>
              <ul>
                <li>
                  {disaster.title}
                </li>
              </ul>
            </li>
          ))}
        </ul>
      );
    }
  }
  }

export default Donate;
