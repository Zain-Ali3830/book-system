import { Book } from "../models/books.models.js";



// Create a new book
export const createBook = async(req, res)=> {
    try {
        const { title, author, publishedDate, pages, genre, price } = req.body;
        const newBook = new Book({ title, author, publishedDate, pages, genre, price });
        const savedBook = await newBook.save();
        res.status(201).json(savedBook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get all books
export const getAllBooks = async(req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// Get a book by id
export const getBookById = async(req, res) => {
   try {
    const title=req.params.title;
    const book=await Book.findMany({title});
    res.status(200).json(book);
   } catch (error) {
    res.status(500).json({ message: error.message });
   }}


// Update a book 
export const updateBook = async(req, res) => {
    try {
        const id=req.params.id; 
        const updatedData=req.body;
        const book=await Book.findByIdAndUpdate(id,updatedData,{returnDocument:"after"});
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// Delete a book by Name
export const deleteBook = async(req, res) => {
    try {
        const id=req.params.id;
        await Book.findByIdAndDelete(id);
        console.log(id);
        res.status(200).json({ message: `Book ${id} deleted successfully` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}