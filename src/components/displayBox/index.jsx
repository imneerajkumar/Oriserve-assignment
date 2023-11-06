import React, { useState } from "react";
import { Modal } from "react-bootstrap";

export default function Display({ images }) {
  const [show, setShow] = useState(false);
  const [data, setData] = useState({});

  const handleShow = (image) => {
    setData(image);
    setShow(true);
  };

  return (
    <div className="displayBox">
      {images?.map((image) => (
        <div
          className="imageContainer"
          key={image?.id}
          onClick={() => handleShow(image)}
        >
          <img
            src={`https://farm${image?.farm}.staticflickr.com/${image?.server}/${image?.id}_${image?.secret}.jpg`}
            alt={image?.title}
          />
        </div>
      ))}
      <Modal show={show} onHide={() => setShow(!show)}>
        <Modal.Header closeButton>
          <Modal.Title>{data?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={`https://farm${data?.farm}.staticflickr.com/${data?.server}/${data?.id}_${data?.secret}.jpg`}
            alt=""
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}
