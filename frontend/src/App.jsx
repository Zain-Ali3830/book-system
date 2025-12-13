import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import BooksTable from "./components/BooksTable";
import BookModal from "./components/BookModal";
import { fetchBooks, updateBook } from "./api/book.api";

const App = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch books from API
  const loadBooks = async () => {
    try {
      const data = await fetchBooks();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleSave = async (data) => {
    try {
      if (selectedBook) {
        await updateBook(selectedBook._id, data);
      }
      // Automatically refresh table
      await loadBooks();
      setIsModalOpen(false);
      setSelectedBook(null);
    } catch (error) {
      console.error("Error saving book:", error);
    }
  };

  // Filter books by search
  const filteredBooks = books.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <SearchBar search={search} setSearch={setSearch} />
        <button
          onClick={() => {
            setSelectedBook(null);
            setIsModalOpen(true);
          }}
          className="ml-0 md:ml-4 px-5 py-2 bg-green-600 text-white rounded-full shadow hover:bg-green-700 transition"
        >
          + Add Book
        </button>
      </div>

      <BooksTable
        books={filteredBooks}
        onEdit={(book) => {
          setSelectedBook(book);
          setIsModalOpen(true);
        }}
      />

      <BookModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        book={selectedBook}
      />
    </div>
  );
};

export default App;
