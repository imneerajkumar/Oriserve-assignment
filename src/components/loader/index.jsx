import React from "react";
import Spinner from "react-bootstrap/Spinner";

export default function Loader() {
  return (
    <div className="loader">
      <Spinner animation="grow" variant="dark" />
      <Spinner animation="grow" variant="dark" />
      <Spinner animation="grow" variant="dark" />
    </div>
  );
}
