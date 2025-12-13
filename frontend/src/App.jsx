import { useState,useEffect } from 'react'
import axios from 'axios'
import SearchBar from './components/SearchBar'
import BooksTable from './components/booksTable'
import BookModal from './components/BookModal'
import { fetchBooks } from './api/book.api'
import { updateBook } from './api/book.api'
import { deleteBook } from './api/book.api'

const App = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);





  useEffect(() => {
    fetchBooks()
      .then((data) => {setBooks(data)
        console.log(data);
      })
      .catch((error) => console.error('Error fetching books:', error));
  }, []);

  // const filteredBooks = books.filter(
  //   (b) =>
  //     b.title.toLowerCase().includes(search.toLowerCase()) ||
  //     b.author.toLowerCase().includes(search.toLowerCase())
  // );

  const handleSave = async (data) => {
    if (selectedBook) {
     updateBook(selectedBook._id, data);
    }
    //  else {
    //   await axios.post("http://localhost:5000/api/books", data);
    // }

    setIsModalOpen(false);
    setSelectedBook(null);
    fetchBooks();
  };



  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <SearchBar  />

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