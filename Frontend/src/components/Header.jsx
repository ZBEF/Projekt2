import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <nav className="navbar navbar-light bg-white shadow-sm px-4 py-2">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <Link to="/" className="navbar-brand fw-bold">
          🍽️ MahlZeit
        </Link>
        <div>
          <Link
            to="/"
            className={`me-3 text-decoration-none ${
              location.pathname === "/" ? "fw-bold text-primary" : ""
            }`}
            aria-current={location.pathname === "/" ? "page" : undefined}
          >
            Reservierungen
          </Link>
          <Link
            to="/tische"
            className={`text-decoration-none ${
              location.pathname === "/tische" ? "fw-bold text-primary" : ""
            }`}
            aria-current={location.pathname === "/tische" ? "page" : undefined}
          >
            Tische
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
