import React, { useEffect, useState } from "react";
import { useBooks } from "../context/BooksContext";
import { FiX } from "react-icons/fi";

const BookModal = ({ isOpen, onClose, onSave, book }) => {
  const { handleCreateBook, handleUpdateBook } = useBooks();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publishedDate: "",
    pages: "",
    genre: "",
    price: ""
  });

  // Reset / populate form when modal opens
  useEffect(() => {
    if (book) {
      setFormData({
        _id: book._id || "",
        title: book.title || "",
        author: book.author || "",
        publishedDate: book.publishedDate || "",
        pages: book.pages || "",
        genre: book.genre || "",
        price: book.price || "",
      });
    } else {
      setFormData({
        _id: null,
        title: "",
        author: "",
        publishedDate: "",
        pages: "",
        genre: "",
        price: "",
      });
    }
  }, [book, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (book) {
      await handleUpdateBook(formData);
    } else {
      await handleCreateBook(formData);
    }
    onSave();
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50  ">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl transform transition-all scale-100">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {book ? "Edit Book" : "Add Book"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <FiX size={24} />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-3">
          {["title", "author", "genre", "publishedDate", "pages", "price"].map(
            (field) => (
              <input
                key={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                           transition placeholder-gray-400"
              />
            )
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end mt-6 space-x-3">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-gray-300 text-gray-700 hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
