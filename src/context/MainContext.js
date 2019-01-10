import React, { Component } from "react";

const Context = React.createContext();
const Reducer = (state, action) => {
  switch (action.type) {
    case "LOAD_BEER":
      return {
        ...state,
        beer: action.payload
      };
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    beer: {},
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
