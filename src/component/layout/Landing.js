import React from "react";
import { Link } from "react-router-dom";
export default function LandingTest() {
  return (
    <section className="hero">
      <img className="logo" src="assets/logo.png" alt="Beau's" />
      <div className="cta">
        Beau's Seasonal:
        <br />
        <span>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores odio
          aut nemo alias earum ipsa cupiditate in mollitia officiis quo eius,
          quam vel nisi sequi, tempora dolore nulla. Magnam, dolor.
        </span>
      </div>

      <Link to="/beaus-seasonal">
        <button className="button-cta">TAKE A LOOK</button>
      </Link>
    </section>
  );
}
