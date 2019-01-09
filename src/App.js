import React, { Component } from "react";

import Landing from "./component/layout/Landing";
import Beers from "./component/beer-list/Beers";
import BeerInfo from "./component/beer-list/BeerInfo";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { Provider } from "./context/MainContext";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <div className="App">
            <Route exact path="/" component={Landing} />
            <Route exact path="/beaus-seasonal" component={Beers} />
            <Route exact path="/beaus-seasonal/:id" component={BeerInfo} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
