import SearchBar from "./components/searchBar";
import InfiniteScroll from "react-infinite-scroll-component";
import DisplayBox from "./components/displayBox";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./components/loader";
import Error from "./components/error";

function App() {
  const [res, setRes] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hasMore, setHasMore] = useState(true);

  const callImageAPI = async (searchInput) => {
    setRes([]);
    setLoading(true);
    const searchType = searchInput ? "search" : "getRecent";
    const api_key = process.env.REACT_APP_API_KEY;
    const baseUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.${searchType}&api_key=${api_key}&safe_search=1&format=json&nojsoncallback=1`;
    const url =
      searchType === "search" ? baseUrl + `&text=${searchInput}` : baseUrl;
    try {
      const { data } = await axios.get(url);
      if (data?.photos?.photo?.length > 0) {
        setRes(data?.photos?.photo);
        setImages(data?.photos?.photo?.slice(0, 10));
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
    const prevSearches = await localStorage?.getItem("searches");
    localStorage?.setItem("searches", (prevSearches || "") + "," + searchInput);
    callImageAPI(searchInput);
  };

  const handleNext = () => {
    if (images?.length > 98) {
      setHasMore(false);
      return;
    }

    setTimeout(() => {
      setImages((images) => [
        ...images,
        ...res?.slice(images?.length, images?.length + 20),
      ]);
    }, 1000);
  };

  useEffect(() => {
    callImageAPI("");
  }, []);

  return (
    <div className="App">
      <SearchBar searchImages={searchImages} />
      {loading && <Loader />}
      {!loading && error ? (
        <Error error={error} />
      ) : (
        <InfiniteScroll
          dataLength={images.length}
          next={handleNext}
          hasMore={hasMore}
          loader={<Loader />}
        >
          <DisplayBox images={images} />
        </InfiniteScroll>
      )}
    </div>
  );
}

export default App;
