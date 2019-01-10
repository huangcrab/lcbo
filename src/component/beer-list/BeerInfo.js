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
    // this.setState({ loading: true });
    // const headers = new Headers();
    // headers.set("Authorization", `Token ${this.state.key}`);
    // fetch(
    //   `https://lcboapi.com/stores?product_id=${this.props.match.params.id}`,
    //   {
    //     method: "GET",
    //     headers: headers
    //   }
    // )
    //   .then(res => res.json())
    //   .then(data => {
    //     console.log(data.result);
    //     this.setState({ stores: data.result });
    //     this.setState({ loading: false });
    //   })
    //   .catch(err => this.setState({ error: err }));
  }

  onStoreClick = (getStores, id) => {
    getStores(id);
  };

  render() {
    return (
      <Consumer>
        {value => {
          const { beer, loading_stores, getStores, stores } = value;
          // const { stores } = this.state;
          return (
            // <div className="back">
            //   {loading ? (
            //     "loading"
            //   ) : (
            //     <div className="container">
            //       <div className="beer-info">
            //         <div className="beer-img">
            //           <img src={beer.image_url} alt="beer img" />
            //         </div>
            //         <div className="beer-name">{beer.name}</div>
            //         <div className="beer-des">Beer Des</div>
            //         <div className="beer-price">Beer Price</div>

            //         <button>Check Nearby stores</button>
            //         <button>Check All Stores</button>
            //       </div>
            // <div className="title">In-Store Availablity</div>
            // <div className="stores">
            //   {stores.map(store => {
            //     return <Store store={store} />;
            //   })}
            // </div>
            //     </div>
            //   )}
            // </div>

            <div className="wrap">
              <div className="card">
                <div className="card-image">
                  {beer.image_url ? (
                    <img
                      className="image"
                      src={beer.image_url}
                      alt={beer.name}
                    />
                  ) : (
                    <img
                      className="image"
                      src='"https://beaus.ca/wp-content/themes/beaus_2016/assets/build/img/beaus-black-logo.svg"'
                      alt={beer.name}
                    />
                  )}
                </div>

                <div className="content">
                  <h2 className="title">{beer.name}</h2>
                  <div className="desc">
                    <p>{beer.tasting_note}</p>
                    <p>{beer.serving_suggestion}</p>
                    <p>Origin: {beer.origin}</p>
                    <p>CAD: {beer.price_in_cents * 0.01}</p>
                    <p>
                      <span>{beer.tags.split(" ").map(tag => "#" + tag)}</span>
                    </p>
                  </div>

                  <div className="button-wrap">
                    <a
                      onClick={this.onStoreClick.bind(
                        this,
                        getStores,
                        this.props.match.params.id
                      )}
                      className="button"
                    >
                      Check In-Store Availablity
                      <span className="button_hover" />
                    </a>
                  </div>
                </div>
              </div>

              {stores == null ? null : (
                <div className="stores">
                  {stores.map(store => {
                    return <Store store={store} />;
                  })}
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
