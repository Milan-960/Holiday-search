import React from "react";

import "./styles/Global.scss";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div className="App">
      <h1>Welcome to your Dream Holiday Search</h1>
      <AppRoutes />
    </div>
  );
}

export default App;
