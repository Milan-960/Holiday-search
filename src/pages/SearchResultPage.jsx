import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { fetchSearchResults } from "../api";
import useFetchData from "../hooks/useFetchData";

const SearchResultsPage = () => {
  // Get the current location and extract the search query from the URL
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");

  // Use the custom hook to fetch search results
  const { data, isLoading, error } = useFetchData(fetchSearchResults, query);
  const searchResults = data && data.sales ? data.sales : [];

  const goBackToSearch = () => {
    navigate(-1);
  };

  const goForward = (event) => {
    event.preventDefault();
    navigate(1);
  };

  const handleResultClick = (id) => {
    navigate(`/sale/${id}`);
  };

  if (error) {
    return <div>Oops! Something went wrong!</div>;
  }

  return (
    <div className="search-results-page">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h1>Search Results</h1>
          <div className="link-buttons">
            <Link onClick={goBackToSearch}>Go back</Link>
            <Link onClick={goForward}>Go forward</Link>
          </div>
          {!Array.isArray(searchResults) || searchResults.length === 0 ? (
            <p>Sorry, we couldn't find any results for your search</p>
          ) : (
            <>
              <div className="results-grid">
                {searchResults.map((result, index) => (
                  <div
                    key={index}
                    className="result-box"
                    onClick={() => handleResultClick(result.id)}
                  >
                    <h3>{result.editorial.title}</h3>
                    <img
                      src={result.photos[0].url}
                      alt={result.editorial.title}
                    />
                    <p>{result.editorial.destinationName}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResultsPage;
