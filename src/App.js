import React from "react";

import AppRoutes from "./routes/AppRoutes";

import "./styles/Global.scss";
import "./index.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const App = () => {
  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
};

export default App;
