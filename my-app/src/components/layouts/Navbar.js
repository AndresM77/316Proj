import React from 'react';
import Cookies from "universal-cookie";
const cookies = new Cookies();

class Navbar extends React.Component {
  render() {
    return <div className="navbar">
      <h1 id="navbar-title">Climate Action</h1>
      <ul className="nav">
        <li><a href="/">Home</a></li>
        <li><a href="/news">News</a></li>
        <li><a href="/donate">Donate</a></li>
        <li><a href="/contacts">Contact Us</a></li>
        {cookies.get("climateAction") ? <> </> : <li><a href="/login">Log In</a></li>}
        {cookies.get("climateAction") ? <> </> : <li><a href="/signup">Sign Up</a></li>}
        {cookies.get("climateAction") ? <li onClick={() => cookies.remove("climateAction")}><a>Logout</a></li> : <> </>}
      </ul>
    </div>
    }
}

export default Navbar;