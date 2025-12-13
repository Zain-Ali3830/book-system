import React, { useEffect, useState } from "react";
import { addBook } from "../api/book.api";
import { useBooks } from "../context/BooksContext";
const BookModal = ({ isOpen, onClose, onSave, book }) => {
  const { handleCreateBook } = useBooks();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publishedDate: "",
    pages: "",
    genre: "",
    price: ""
  });

  useEffect(() => {
    if (book) {
      setFormData(book);
    }
  }, [book]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    addBook(formData);
    onSave(formData);
    handleCreateBook(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white w-[500px] p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">
          {book ? "Edit Book" : "Add Book"}
        </h2>

        <div className="space-y-3">
          {["title", "author", "genre", "publishedDate", "pages", "price"].map(
            (field) => (
              <input
                key={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={field}
                className="w-full border px-3 py-2 rounded"
              />
            )
          )}
        </div>

        <div className="flex justify-end mt-4 space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
