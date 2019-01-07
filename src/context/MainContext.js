import React, { Component } from "react";

const Context = React.createContext();
const Reducer = (state, action) => {};

export class Provider extends Component {
  state = {
    beers: [],
    dispatch: action => {
      this.setState(state => Reducer(state, action));
    }
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
