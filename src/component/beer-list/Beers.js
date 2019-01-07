import React, { Component } from "react";
import styled from "styled-components";

const Columns = styled.div`
  column-count: 5;
`;

const Card = styled.div`
  & img {
  }
`;

class Beers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key:
        "MDo4MGMwOTk4MC0xMDRhLTExZTktYmEzNi0zMzQ4ODcyMDk4NGI6VmtodmM0cEFISnpLbk9vY3RrSXpRMk5nQ3pUdThVOHB0UEFT",
      loading: false,
      beers: [],
      error: {}
    };
  }

  componentDidMount() {
    if (this.state.beers === []) {
      this.setState({ loading: true });
    }
    const headers = new Headers();
    headers.set("Authorization", `Token ${this.state.key}`);
    fetch(`https://lcboapi.com/products?per_page=50&q=beau's+beer`, {
      method: "GET",
      headers: headers
    })
      .then(res => res.json())
      .then(data => {
        console.log(data.result);
        if (data.pager.total_pages > 1) {
          const all_beers = [];
          all_beers.push(...data.result);
          const promiseChain = [];

          for (let i = 2; i <= data.pager.total_pages; i++) {
            promiseChain.push(
              fetch(
                `https://lcboapi.com/products?per_page=50&q=beau's+beer&page=${i}`,
                {
                  method: "GET",
                  headers: headers
                }
              )
                .then(res => res.json())
                .then(data => data.result)
            );
          }
          Promise.all(promiseChain)
            .then(datas => {
              datas.forEach(ele => all_beers.push(...ele));
              this.setState({ beers: all_beers });
              this.setState({ loading: false });
            })
            .catch(err => this.setState({ error: err }));
        } else {
          this.setState({ beers: data.result });
          this.setState({ loading: false });
        }
      })
      .catch(err => this.setState({ error: err }));
  }

  render() {
    const { loading, beers } = this.state;
    return (
      <div>
        <Columns className="card-columns">
          {loading
            ? "Loading"
            : beers
                .filter(
                  ele =>
                    ele.producer_name === "Beau's All Natural Brewing" &&
                    ele.is_seasonal === true &&
                    ele.is_dead === false
                )
                .map(beer => {
                  return (
                    <Card class="card">
                      <img
                        src={
                          beer.image_thumb_url
                            ? beer.image_thumb_url
                            : "https://beaus.ca/wp-content/themes/beaus_2016/assets/build/img/beaus-black-logo.svg"
                        }
                        class="card-img-top"
                        alt={beer.name}
                      />
                      <div class="card-body">
                        <h5 class="card-title">{beer.name}</h5>
                        <p class="card-text">{beer.tags}</p>
                      </div>
                    </Card>
                  );
                })}
        </Columns>
      </div>
    );
  }
}

export default Beers;
