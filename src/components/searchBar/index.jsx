import React, { useState } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";

export default function SearchBar(props) {
  const [searchInput, setSearchInput] = useState("");

  return (
    <div className="topBar">
      <h1 className="heading">Search Photos</h1>
      <InputGroup className="mb-3 searchInput">
        <Form.Control
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
          placeholder="Search..."
        />
        <Button
          variant="primary"
          onClick={() => props.searchImages(searchInput)}
        >
          Search
        </Button>
      </InputGroup>
      <div>{localStorage.getItem("searches")}</div>
    </div>
  );
}
