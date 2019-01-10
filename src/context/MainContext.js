import React, { Component } from "react";

const Context = React.createContext();
const Reducer = (state, action) => {
  switch (action.type) {
    case "LOAD_BEER":
      return {
        ...state,
        beer: action.payload
      };
    case "LOAD_BEERS":
      return {
        ...state,
        beers: action.payload
      };
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    key:
      "MDo4MGMwOTk4MC0xMDRhLTExZTktYmEzNi0zMzQ4ODcyMDk4NGI6VmtodmM0cEFISnpLbk9vY3RrSXpRMk5nQ3pUdThVOHB0UEFT",
    beer: {},
    beers: [],
    stores: [],
    error: {},
    loading_stores: false,
    dispatch: action => {
      this.setState(state => Reducer(state, action));
    },

    getStores: id => {
      this.setState({ loading_stores: true });
      const headers = new Headers();
      headers.set("Authorization", `Token ${this.state.key}`);
      fetch(`https://lcboapi.com/stores?product_id=${id}`, {
        method: "GET",
        headers: headers
      })
        .then(res => res.json())
        .then(data => {
          console.log(data.result);
          this.setState({ stores: data.result });
          this.setState({ loading_stores: false });
        })
        .catch(err => this.setState({ error: err }));
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
