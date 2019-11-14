import React from 'react';

class Navbar extends React.Component {
  render() {
    return <div class="navbar">
      <h1 id="navbar-title">Climate Action</h1>
      <ul className="nav">
        <li><a href="/">Home</a></li>
        <li><a href="/news">News</a></li>
        <li><a href="/donate">Donate</a></li>
        <li><a href="/contacts">Contact Us</a></li>
      </ul>
    </div>
    }
}

export default Navbar;