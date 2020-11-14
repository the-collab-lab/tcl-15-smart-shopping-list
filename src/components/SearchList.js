import React from 'react';

const SearchList = ({ searchTerm, setSearchTerm }) => (
  <div className="search-term-wrapper">
    <label aria-label="Search Item" htmlFor="search-item"></label>
    <input
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search item"
      id="search-item"
    />

    <button
      onClick={() => setSearchTerm('')}
      disabled={searchTerm ? false : true}
      aria-label="Clear search term"
    >
      X
    </button>
  </div>
);

export default SearchList;
