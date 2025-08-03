import React from "react";
import { Link } from "react-router-dom";
import "../styles/components.css";

function Navigation() {
  return (
    <header className="site-header">
      {/* Logo/Branding Section */}
      <div className="header-brand">
        <Link to="/" className="brand-link">
          <h1 className="site-title">SEAHAWKS COMMUNITY</h1>
          <span className="site-subtitle">Forum</span>
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav className="main-navigation">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              <span className="nav-icon">🏠</span>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/create" className="nav-link">
              <span className="nav-icon">✏️</span>
              Create Post
            </Link>
          </li>
        </ul>
      </nav>

      {/* User Actions (for future expansion) */}
      <div className="header-actions"></div>
    </header>
  );
}

export default Navigation;
