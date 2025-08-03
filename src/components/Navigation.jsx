import React from "react";
import { Link } from "react-router-dom";
import "../styles/components.css";

function Navigation() {
  return (
    <header className="site-header">
      <div className="header-brand">
        <Link to="/" className="brand-link">
          <h1 className="site-title">SEAHAWKS COMMUNITY</h1>
          <span className="site-subtitle">Forum</span>
        </Link>
      </div>

      <nav className="main-navigation">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/create" className="nav-link">
              Create Post
            </Link>
          </li>
        </ul>
      </nav>

      <div className="header-actions"></div>
    </header>
  );
}

export default Navigation;
