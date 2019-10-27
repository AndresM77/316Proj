import React, {Component} from 'react';
import Navbar from './components/layouts/Navbar';
//Import styling
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
//React router Import
import {Switch, Route} from 'react-router-dom';
//Import Pages
import Home from './components/pages/Home';
import News from './components/pages/News';
import Donate from './components/pages/Donate';
import NotFoundPage from './components/pages/NotFoundPage';
import Contacts from './components/pages/Contacts';
//Data pulled from api
import Weather from './components/weather'

class App extends Component{
  state = {
    weather: []
  }
  componentDidMount = () => {
    fetch('http://climatedataapi.worldbank.org/climateweb/rest/v1/country/annualavg/tas/1980/1999/USA')
    .then(res => res.json())
    .then((data) => { 
      console.log(data);
      this.setState({ weather: data })
    })
    .catch(console.log);
  }
  render() {
    return(
      <div>
      <Navbar />
      <Weather weathers={this.state.weather} />
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/news" component={News}/>
        <Route path="/contacts" component={Contacts}/>
        <Route path="/donate" component={Donate}/>
        <Route path="/404" component={NotFoundPage}/>
      </Switch>
    </div>
  );
  }
}



// function App() {
//   return (
//   <div>
//     <Navbar />
//     <Weather weathers={this.state.weather} />
//     <Switch>
//       <Route exact path="/" component={Home}/>
//       <Route path="/news" component={News}/>
//       <Route path="/contacts" component={Contacts}/>
//       <Route path="/donate" component={Donate}/>
//       <Route path="/404" component={NotFoundPage}/>
//     </Switch>
//   </div>
// );
// }

export default App;
