import React, { useState } from "react";

function SearchBar({ onSearch, currentSearchTerm = "" }) {
  const [query, setQuery] = useState(currentSearchTerm);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Seahawks discussions..."
          className="search-input"
        />
        <button type="submit" className="search-btn">
          🔍 Search
        </button>
        {query && (
          <button type="button" onClick={handleClear} className="clear-btn">
            ✕ Clear
          </button>
        )}
      </form>
    </div>
  );
}

export default SearchBar;
