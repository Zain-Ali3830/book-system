import React from "react";
import { useBooks } from "../context/BooksContext";
const SearchBar = () => {
  const { setSearch } = useBooks();
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search book by title or author..."
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchBar;
