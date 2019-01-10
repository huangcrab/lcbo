import React, { Component } from "react";
import styled from "styled-components";
import Beer from "./Beer";

const Table = styled.ul`
  display: table;
  margin: 0 auto;
  width: 80%;
  padding: 0;

  & li {
    margin: 15px;
    box-sizing: border-box;
    list-style-type: none;
    display: table-cell;
    position: relative;
    overflow: hidden;
    float: left;
    height: 220px;
    width: calc(20% - 30px);
    padding: 0;
    transition-property: transform;
    transition-duration: 300ms;
    transition-timing-function: ease;
    a {
      color: inherit;
    }
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.4);

    &:hover,
    &:focus {
      box-shadow: 0px 7px 12px rgba(0, 0, 0, 0.4);
      transform: translateY(-5px);
    }
  }

  & li img {
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
  }

  & li .content {
    background: rgba(245, 223, 190, 0.6);
    color: #000;
    padding: 5px;
    margin: 0;

    width: 100%;
    text-decoration: none;
    position: absolute;
    bottom: 0;
    &:link {
      text-decoration: none;
    }
    & p {
      text-align: center;
      text-decoration: none;
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
        <div className="title">Seasonal List</div>
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
