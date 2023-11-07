import SearchBar from "./components/searchBar";
import DisplayBox from "./components/displayBox";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./components/loader";
import Error from "./components/error";

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const callImageAPI = async (searchType, searchInput) => {
    const api_key = process.env.REACT_APP_API_KEY;
    const baseUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.${searchType}&api_key=${api_key}&safe_search=1&format=json&nojsoncallback=1`;
    const url =
      searchType === "search" ? baseUrl + `&text=${searchInput}` : baseUrl;
    try {
      const { data } = await axios.get(url);
      if (data?.photos?.photo?.length > 0) {
        setImages(data?.photos?.photo);
      } else {
        setError("No Data found");
      }
      setLoading(false);
    } catch (err) {
      setError(err?.message);
      setLoading(false);
    }
  };

  const searchImages = async (searchInput) => {
    setImages([]);
    setLoading(true);
    const prevSearches = await localStorage?.getItem("searches");
    localStorage?.setItem("searches", (prevSearches || "") + "," + searchInput);
    callImageAPI("search", searchInput);
  };

  useEffect(() => {
    callImageAPI("getRecent", "");
  }, []);

  return (
    <div className="App">
      <SearchBar searchImages={searchImages} />
      {loading && <Loader />}
      {!loading && error ? (
        <Error error={error} />
      ) : (
        <DisplayBox images={images} />
      )}
    </div>
  );
}

export default App;
