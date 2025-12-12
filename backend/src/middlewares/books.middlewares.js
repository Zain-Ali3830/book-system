import { Book } from "../models/books.models.js";
export const validateBookData = (req, res, next) => {
    const { title, author, publishedDate, pages, genre, price } = req.body;
    if (!title || !author || !publishedDate || !pages || !genre || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }
    next();
  };

    export const validateBookIdParam = (req, res, next) => {
        const { id } = req.params;
        if (!id) {
          return res.status(400).json({ message: "Book ID is required" });
        }
        next();
      };


export const validateBookBeforeDelete = (req, res, next) => {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ message: "Book ID is required for deletion" });
    }
    const book = Book.findOne({ id });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    next();
  };    