import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ReservationDashboard from "./pages/ReservationDashboard";
import Tables from "./pages/Tables";
import "bootstrap/dist/css/bootstrap.min.css";


const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-4">
        {/* Kein container/container-fluid hier – volle Breite */}
        <Routes>
          <Route path="/" element={<ReservationDashboard />} />
          <Route path="/tische" element={<Tables />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
