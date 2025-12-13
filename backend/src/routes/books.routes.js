import express from 'express';
import { createBook, getAllBooks, getBookById, updateBook, deleteBook } from '../controllers/books.controllers.js';
import { validateBookData, validateBookIdParam, validateBookBeforeDelete } from '../middlewares/books.middlewares.js';
const router = express.Router();

router.route('/getbooks')
    .get(getAllBooks)
router.route('/getbook/:title')
    .get(validateBookIdParam, getBookById);
router.route('/addbook')
    .post(validateBookData, createBook);
router.route('/updatebook/:id')
    .put(validateBookIdParam, updateBook);
router.route('/deletebook/:id')
    .delete(validateBookBeforeDelete, deleteBook);

export default router;