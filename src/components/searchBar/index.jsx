import React, { useState } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";

export default function SearchBar(props) {
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [show, setShow] = useState(false);

  const handleFocus = () => {
    if (localStorage?.getItem("searches")) {
      const searches = [
        ...new Set(localStorage.getItem("searches")?.split(",")),
      ];
      setSuggestions(() => searches.filter((item) => item.length > 1));
    }
    setShow(true);
  };

  const handleClear = () => {
    localStorage?.removeItem("searches");
    setSuggestions([]);
  };

  return (
    <div className="topBar">
      <h1 className="heading">Search Photos</h1>
      <InputGroup className="mb-3 searchInput">
        <>
          <Form.Control
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
            placeholder="Search..."
            onBlur={() => setTimeout(() => setShow(false), 2000)}
            onFocus={handleFocus}
          />
          <Button
            variant="primary"
            onClick={() => props.searchImages(searchInput)}
          >
            Search
          </Button>
        </>
        {suggestions?.length > 0 && show && (
          <div className="suggestions">
            {suggestions?.map((item, index) => (
              <p key={`${item + index}`} onClick={() => setSearchInput(item)}>
                {item}
              </p>
            ))}
            <div className="clearBtn">
              <Button variant="danger" onClick={handleClear}>
                Clear
              </Button>
            </div>
          </div>
        )}
      </InputGroup>
    </div>
  );
}
