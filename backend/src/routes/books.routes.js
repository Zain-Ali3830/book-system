import express from 'express';
import { createBook, getAllBooks, getBookById, updateBook, deleteBook } from '../controllers/books.controllers.js';

const router = express.Router();

router.get('/books', getAllBooks);
router.get('/getbook/:id', getBookById);
router.post('/addbook', createBook);
router.put('/updatebook/:id', updateBook);
router.delete('/deletebook/:id', deleteBook);

export default router;