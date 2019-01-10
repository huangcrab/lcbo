import React from "react";

export default function Store(props) {
  const address =
    " " +
    props.store.address_line_1 +
    " " +
    props.store.address_line_2 +
    ", " +
    props.store.city +
    ", " +
    props.store.postal_code;
  return (
    <div className="store-card">
      <div className="map" />
      <div className="store-content">
        <h4>{props.store.name}</h4>
        <p className="store-address">
          <i class="fas fa-map-marker-alt" /> :{" "}
          <a
            href="https://www.google.com/maps/place/21+Brown+St,+Providence,+RI+02906,+USA/@41.8242954,-71.4044756,17z/data=!3m1!4b1!4m5!3m4!1s0x89e4453c442f5b9f:0x22d5b1cf16b79db7!8m2!3d41.8242914!4d-71.4022869?hl=en"
            target="_blank"
          >
            {address}
          </a>
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
