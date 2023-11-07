import React from "react";

export default function Error(props) {
  return (
    <div className="error">
      <img
        src="https://cdn-icons-png.flaticon.com/512/6478/6478111.png"
        alt=""
      />
      <h2>{props.error}</h2>
    </div>
  );
}
