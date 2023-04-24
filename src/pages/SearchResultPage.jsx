import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { fetchSearchResults } from "../api";

const SearchResultsPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const goForward = (event) => {
    event.preventDefault();
    navigate(1);
  };

  const fetchResults = async (query) => {
    try {
      const data = await fetchSearchResults(query);
      if (data.notFound) {
        setNotFound(true);
      } else {
        setSearchResults(data.sales);
      }
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  // useEffect fetches search results based on the query parameter from the URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("query");
    fetchResults(query);
  }, [location.search]);

  const handleResultClick = (id) => {
    navigate(`/sale/${id}`);
  };

  // Rendering loading state when fetching data
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Oops! Something went wrong!!</div>;
  }

  return (
    <div className="search-results-page">
      <h1>Search Results</h1>
      <Link onClick={goBack}>Go Back</Link>
      {notFound ? (
        <div>Sorry, we couldn't find any results for your search</div>
      ) : (
        <>
          <Link onClick={goForward}>Go Forward</Link>
          <div className="results-grid">
            {searchResults.map((result) => (
              <div
                key={result.id}
                className="result-box"
                onClick={() => handleResultClick(result.id)}
              >
                <h2>{result.editorial.title}</h2>
                <p>{result.editorial.destinationName}</p>
                <img src={result.photos[0].url} alt={result.editorial.title} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchResultsPage;
