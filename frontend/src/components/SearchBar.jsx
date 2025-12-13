import React from "react";
import { useBooks } from "../context/BooksContext";
import { FiSearch } from "react-icons/fi"; // react-icons import

const SearchBar = () => {
  const { setSearch } = useBooks();

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Search Icon */}
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FiSearch className="h-5 w-5 text-gray-400" />
      </div>

      {/* Input Field */}
      <input
        type="text"
        placeholder="Search by title or author..."
        onChange={(e) => setSearch(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full shadow-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                   transition placeholder:text-gray-400"
      />
    </div>
  );
};

export default SearchBar;
