import React, { Component } from 'react';

class Contacts extends Component {
  render() {
    return (
      <div>
        <h2 className="titleItem"> The Team </h2>
        <div className="teamItems">
          <h3> Adam </h3>
          <p> email: adam.gonen@duke.edu</p>
          <h3> Andres </h3>
          <p> email: am708@duke.edu </p>
          <h3> Ethan </h3>
          <p> email: astrachanethan@gmail.com</p>
          <h3> Frank </h3>
          <p> email: jg391@duke.edu</p>
          <h3> Joeseph </h3>
          <p> email: jce19@duke.edu</p>
          <h3> Ryan </h3>
          <p> email: rcc24@duke.edu</p>
        </div>
      </div>
    );
  }
}

export default Contacts;
