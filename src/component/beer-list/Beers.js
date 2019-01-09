import React, { Component } from "react";
import styled from "styled-components";
import Beer from "./Beer";

const Table = styled.ul`
  display: table;
  margin: 0 auto;
  width: 1000px;

  & li {
    margin: 15px;
    box-sizing: border-box;
    list-style-type: none;
    display: table-cell;
    position: relative;
    overflow: hidden;
    float: left;
    height: 200px;
    width: calc(20% - 30px);
    padding: 2px;

    &:hover,
    &:focus {
      box-shadow: 0 0.5em 0.5em -0.4em rgba(245, 224, 190, 0.3);
      transform: translateY(-0.25em);
    }
  }

  & li img {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    width: 50%;
  }

  & li .content {
    text-decoration: none;
    position: absolute;
    bottom: 0;

    & p {
      font-size: 12px;
      font-weight: bold;
    }
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
        <Table>
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
                  return <Beer beer={beer} />;
                })}
        </Table>
      </div>
    );
  }
}

export default Beers;
