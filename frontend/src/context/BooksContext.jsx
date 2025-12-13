import { createContext, useContext, useEffect, useState } from "react";
import { fetchBooks, deleteBook, updateBook } from "../api/book.api";

const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");


  const loadBooks = async () => {
   setLoading (true);
    const data = await fetchBooks();
    setBooks(data);
    setLoading(false);
  };

  const handleCreateBook = async (newBook) => {
    const createdBook = await addBook(newBook);
    setBooks((prev) => [...prev, createdBook]);
  };


  const handleUpdateBook = async (updatedBook) => {
    const book = await updateBook(updatedBook._id, updatedBook);
    setBooks((prev) =>
      prev.map((b) => (b._id === updatedBook._id ? book : b))
    );
  }

  const deleteBookById = async (id) => {
    await deleteBook(id);
    setBooks((prev) => prev.filter((b) => b._id !== id));
  };



const filteredBooks = books.filter(
  (b) =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.author.toLowerCase().includes(search.toLowerCase())
);

  useEffect(() => {
    loadBooks();
  }, []);

  return (
    <BooksContext.Provider
      value={{
        books: filteredBooks,
        loading,
        deleteBookById,
        handleCreateBook,
        handleUpdateBook,
        setSearch,
        reloadBooks: loadBooks,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export const useBooks = () => useContext(BooksContext);
