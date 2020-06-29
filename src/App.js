import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import logo from './logo.svg';

import AddAttraction from "./components/add-attraction.component";
import Attraction from "./components/attraction.component";
import AttractionList from "./components/attraction-list.component";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/attractions" className="navbar-brand">
              <img src={logo} className="App-logo" alt="logo" />
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/attractions"} className="nav-link">
                  Attractions
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Add
                </Link>
              </li>
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route
                exact
                path={["/", "/attractions"]}
                component={AttractionList}
              />
              <Route exact path="/add" component={AddAttraction} />
              <Route path="/attractions/:id" component={Attraction} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
export default App;
