import React from "react";

const SearchBar = ({ search, setSearch }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search book by title or author..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchBar;
