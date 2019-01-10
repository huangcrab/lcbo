import React, { Component } from "react";
import { Consumer } from "../../context/MainContext";
import styled from "styled-components";
import Store from "./Store";
import "./beerinfo.css";

class BeerInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key:
        "MDo4MGMwOTk4MC0xMDRhLTExZTktYmEzNi0zMzQ4ODcyMDk4NGI6VmtodmM0cEFISnpLbk9vY3RrSXpRMk5nQ3pUdThVOHB0UEFT",
      loading: false,
      stores: [],
      error: {}
    };
  }
  componentDidMount() {
    this.setState({ loading: true });
    const headers = new Headers();
    headers.set("Authorization", `Token ${this.state.key}`);
    fetch(
      `https://lcboapi.com/stores?product_id=${this.props.match.params.id}`,
      {
        method: "GET",
        headers: headers
      }
    )
      .then(res => res.json())
      .then(data => {
        console.log(data.result);
        this.setState({ stores: data.result });
        this.setState({ loading: false });
      })
      .catch(err => this.setState({ error: err }));
  }

  render() {
    return (
      <Consumer>
        {value => {
          const { beer } = value;
          const { stores, loading } = this.state;
          return (
            <div className="back">
              {loading ? (
                "loading"
              ) : (
                <div className="container">
                  <div className="beer-info">
                    <div className="beer-img">
                      <img src={beer.image_url} alt="beer img" />
                    </div>
                    <div className="beer-name">{beer.name}</div>
                    <div className="beer-des">Beer Des</div>
                    <div className="beer-price">Beer Price</div>
                  </div>
                  <div className="title">In-Store Availablity</div>
                  <div className="stores">
                    {stores.map(store => {
                      return <Store store={store} />;
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default BeerInfo;
