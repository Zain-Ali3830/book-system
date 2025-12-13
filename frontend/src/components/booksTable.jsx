import React from "react";
import { useBooks } from "../context/BooksContext";

const BooksTable = ({ onEdit }) => {
  const { books, deleteBookById } = useBooks();

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b">
        <h2 className="text-xl font-semibold text-gray-800">
          📚 Books Collection
        </h2>
        <p className="text-sm text-gray-500">
          Manage, edit or delete your books
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-left">Author</th>
              <th className="px-6 py-3 text-left">Genre</th>
              <th className="px-6 py-3 text-center">Pages</th>
              <th className="px-6 py-3 text-center">Price</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {books.map((book) => (
              <tr
                key={book._id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 font-medium text-gray-800">
                  {book.title}
                </td>

                <td className="px-6 py-4">{book.author}</td>

                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                    {book.genre}
                  </span>
                </td>

                <td className="px-6 py-4 text-center">
                  {book.pages}
                </td>

                <td className="px-6 py-4 text-center font-semibold">
                  ${book.price}
                </td>

                <td className="px-6 py-4 text-center space-x-2">
                  <button
                    onClick={() => onEdit(book)}
                    className="px-4 py-1.5 text-sm rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteBookById(book._id)}
                    className="px-4 py-1.5 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {books.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-10 text-gray-400"
                >
                  🚫 No books found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BooksTable;
