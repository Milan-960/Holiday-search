import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchSearchResults } from "../api";

const SearchResultsPage = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("query");

    fetchSearchResults(query).then((data) => {
      setResults(data.sales);
    });
  }, [location.search]);

  const handleResultClick = (id) => {
    navigate(`/sale/${id}`);
  };

  return (
    <div className="search-results-page">
      <h1>Search Results</h1>
      <div className="results-grid">
        {results.map((result) => (
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
    </div>
  );
};

export default SearchResultsPage;
