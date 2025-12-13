import React from "react";
import { useBooks } from "../context/BooksContext";
const BooksTable = ({ onEdit , searchedBooks}) => {
  const { books, deleteBookById } = useBooks();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Title</th>
            <th className="border p-2">Author</th>
            <th className="border p-2">Genre</th>
            <th className="border p-2">Pages</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {books.map((book) => (
            <tr key={book._id} className="text-center">
              <td className="border p-2">{book.title}</td>
              <td className="border p-2">{book.author}</td>
              <td className="border p-2">{book.genre}</td>
              <td className="border p-2">{book.pages}</td>
              <td className="border p-2">{book.price}</td>

              <td className="border p-2 space-x-2">
                <button
                  onClick={() => onEdit(book)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteBookById(book._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {books.length === 0 && (
            <tr>
              <td colSpan="6" className="p-4 text-gray-500">
                No books found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BooksTable;
