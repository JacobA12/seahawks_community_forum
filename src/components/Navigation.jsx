import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/create">Create Post</Link>
        </li>
        {/* Add more navigation links as needed */}
      </ul>
    </nav>
  );
}

export default Navigation;
