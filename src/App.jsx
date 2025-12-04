import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/header/Header";
import Dashboard from "./pages/dashboard/Dashboard";
import Notifications from "./pages/notifications/Notifications";

function App() {
  return (
    <Router>
      <div className="app_wrapper">
        <Header />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="*" element={<div> Not found </div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
