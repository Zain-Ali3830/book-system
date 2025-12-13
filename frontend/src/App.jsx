import { useState,useEffect } from 'react'
import axios from 'axios'
import SearchBar from './components/SearchBar'
import BooksTable from './components/booksTable'
import BookModal from './components/BookModal'

const App = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchBooks = async () => {
    const res = await axios.get("http://localhost:5000/api/books");
    setBooks(res.data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const filteredBooks = books.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = async (data) => {
    if (selectedBook) {
      await axios.put(
        `http://localhost:5000/api/books/${selectedBook._id}`,
        data
      );
    } else {
      await axios.post("http://localhost:5000/api/books", data);
    }

    setIsModalOpen(false);
    setSelectedBook(null);
    fetchBooks();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/books/${id}`);
    fetchBooks();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <SearchBar search={search} setSearch={setSearch} />

        <button
          onClick={() => {
            setSelectedBook(null);
            setIsModalOpen(true);
          }}
          className="ml-4 px-4 py-2 bg-green-600 text-white rounded"
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
        onDelete={handleDelete}
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