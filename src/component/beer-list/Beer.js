import React from "react";
import { Consumer } from "../../context/MainContext";
import { Link } from "react-router-dom";

export default function Beer(props) {
  const onLoadClick = (beer, dispatch) => {
    dispatch({
      type: "LOAD_BEER",
      payload: beer
    });
  };
  return (
    <Consumer>
      {value => {
        const { beer } = props;
        const { dispatch } = value;
        return (
          <li onClick={onLoadClick.bind(this, beer, dispatch)}>
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
      }}
    </Consumer>
  );
}
