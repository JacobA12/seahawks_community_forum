import React from "react";

// SortOptions.jsx

function SortOptions({ sortBy, onSortChange }) {
  return (
    <div className="sort-options">
      <label htmlFor="sort-select">Sort By:</label>
      <select
        id="sort-select"
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="created_at_desc">Newest</option>
        <option value="created_at_asc">Oldest</option>
        <option value="upvotes_desc">Most Upvotes</option>
      </select>
    </div>
  );
}

export default SortOptions;
