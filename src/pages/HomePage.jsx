import React from "react";

const HomePage = () => {
  return (
    <div>
      <h1>Search for a Holiday</h1>

      <input type="text" placeholder="Search by location" autoComplete="on" />
      <button type="submit">Search</button>
    </div>
  );
};

export default HomePage;
