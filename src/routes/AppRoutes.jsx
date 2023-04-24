import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "../pages/HomePage";
import SearchResultPage from "../pages/SearchResultPage";
import SaleDetailPage from "../pages/SaleDetailPage";

const AppRoutes = () => {
  return (
    <>
      <Router>
        <Suspense fallback={<div>Loading!!!!</div>}>
          <Routes>
            <Route path="/" exact element={<HomePage />} />
            <Route path="/search" element={<SearchResultPage />} />
            <Route path="/Result" element={<SaleDetailPage />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
};

export default AppRoutes;
