import React from "react";

export default function BeerInfo(props) {
  return <div>{props.match.params.id}</div>;
}
