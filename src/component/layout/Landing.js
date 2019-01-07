import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Background = styled.img`
  display: block;
  position: absolute;
  left: 50%;
  top: 50%;
  min-width: 100%;
  min-height: 100%;
  transform: translate(-50%, -50%);
  z-index: -1;

  filter: blur(10px);
`;

const Heading = styled.div`
  & h1 {
    margin: 90px;
    font-size: 60px;
    color: var(--lcbo-brown);
  }
  position: relative;
  margin: 0 auto;
`;

const Logo = styled.img`
  max-width: 80%;
  max-height: 80%;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: var(--lcbo-grey);
  opacity: 0.4;
  overflow: hidden;
`;

const About = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const Button = styled(Link)``;

export default class Landing extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <Heading>
              <h1>Beau's Seasonal</h1>
            </Heading>
          </div>
          <div className="row">
            <div className="col-md-4" align="center">
              <Logo src="assets/logo.png" alt="Beau's" />
            </div>
            <About className="col-md-8">
              <div className="about">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Dolores odio aut nemo alias earum ipsa cupiditate in mollitia
                officiis quo eius, quam vel nisi sequi, tempora dolore nulla.
                Magnam, dolor.
              </div>
              <Button to="/beaus-seasonal">More Detail</Button>
            </About>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
