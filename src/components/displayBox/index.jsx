import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../loader";

export default function Display({ images }) {
  const [show, setShow] = useState(false);
  const [modalImage, setModalImage] = useState({});
  const [data, setData] = useState(images.slice(20));

  const handleShow = (image) => {
    setModalImage(image);
    setShow(true);
  };

  const setMoreImages = () => {
    setData(images.slice(40));
  };

  return (
    <div>
      <InfiniteScroll
        className="displayBox"
        dataLength={data?.length}
        next={setMoreImages}
        loader={<Loader />}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {data?.map((image) => (
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
      </InfiniteScroll>
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
