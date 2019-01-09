import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Beer(props) {
  const { beer } = props;

  return (
    <li>
      <Link to={`/beaus-seasonal/${beer.id}`}>
        <img
          src={
            beer.image_thumb_url
              ? beer.image_thumb_url
              : "https://beaus.ca/wp-content/themes/beaus_2016/assets/build/img/beaus-black-logo.svg"
          }
          alt={beer.name}
        />

        <div className="content">
          <p>{beer.name}</p>
          <p>CAD: {beer.price_in_cents * 0.01}</p>
        </div>
      </Link>
    </li>
  );
}
