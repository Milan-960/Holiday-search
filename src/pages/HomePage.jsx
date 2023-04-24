import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchQuery}`);
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="home-page">
      <h1>Search for a Holiday</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleChange}
          placeholder="Search by location"
          autoComplete="on"
          aria-label="Search"
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default HomePage;
