import React, { useState } from "react";
import { Modal } from "react-bootstrap";

export default function Display({ images }) {
  const [show, setShow] = useState(false);
  const [modalImage, setModalImage] = useState({});

  const handleShow = (image) => {
    setModalImage(image);
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
          <Modal.Title>
            <h4>{modalImage?.title}</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={`https://farm${modalImage?.farm}.staticflickr.com/${modalImage?.server}/${modalImage?.id}_${modalImage?.secret}.jpg`}
            alt=""
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}
