import { createContext, useContext, useEffect, useState } from "react";
import { fetchBooks, deleteBook } from "../api/book.api";

const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadBooks = async () => {
   setLoading (true);
    const data = await fetchBooks();
    setBooks(data);
    setLoading(false);
  };

  const handleCreateBook = (newBook) => {
    setBooks((prev) => [...prev, newBook]);
  };

  const deleteBookById = async (id) => {
    await deleteBook(id);

    // 🔥 AUTO UPDATE UI (NO REFETCH)
    setBooks((prev) => prev.filter((b) => b._id !== id));
  };

  useEffect(() => {
    loadBooks();
  }, []);

  return (
    <BooksContext.Provider
      value={{
        books,
        loading,
        deleteBookById,
        handleCreateBook,
        reloadBooks: loadBooks,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export const useBooks = () => useContext(BooksContext);
