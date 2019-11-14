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
      .then(data =>
          this.setState({
            isLoaded: true,
            disasters: data.data
          }))
      .catch(err => {
        this.setState({
          isLoaded: true,
          err
        })
      })
  }

  render() {
    const { error, isLoaded, disasters } = this.state;
    console.log(disasters)
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
        <div><h2 className="titleItem">Donate</h2></div>
        <ul>
          {disasters.map((dis, i) => (
            <li key={i}>
                  <a href="/" target="_blank" rel="noopener noreferrer">{dis.fields.title}</a>
            </li>
          ))}
        </ul>
        </div>
      );
    }
  }
  }

export default Donate;
