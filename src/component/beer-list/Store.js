import React from "react";
import "./store.css";
export default function Store(props) {
  return (
    <div className="store-card">
      <div className="map" />
      <div className="store-content">
        <h4>{props.store.name}</h4>
        <p className="store-address">
          <i class="fas fa-map-marker-alt" /> :
          {" " +
            props.store.address_line_1 +
            " " +
            props.store.address_line_2 +
            ", " +
            props.store.city +
            ", " +
            props.store.postal_code}
        </p>
        <p className="store-contact">
          <i class="fas fa-phone" /> :
          <a href={`tel:${props.store.telephone}`}> {props.store.telephone}</a>
          <br /> <i class="fas fa-fax" /> : {props.store.fax}
        </p>
      </div>
    </div>
  );
}
