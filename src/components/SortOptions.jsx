import React from "react";

// SortOptions.jsx

function SortOptions({ sortBy, onSortChange }) {
  return (
    <div className="sort-container">
      <label htmlFor="sort-select" className="sort-label">
        Sort By:
      </label>
      <select
        id="sort-select"
        className="sort-select"
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="created_at_desc">Newest First</option>
        <option value="created_at_asc">Oldest First</option>
        <option value="upvotes_desc">Most Popular</option>
      </select>
    </div>
  );
}

export default SortOptions;
