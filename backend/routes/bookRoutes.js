import express from 'express';
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getCategories
} from '../controllers/bookController.js';
import { validateBook } from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.get('/', getAllBooks);
router.get('/categories', getCategories);
router.get('/:id', getBookById);

// Admin routes (can add auth middleware later)
router.post('/', validateBook, createBook);
router.put('/:id', validateBook, updateBook);
router.delete('/:id', deleteBook);

export default router;
