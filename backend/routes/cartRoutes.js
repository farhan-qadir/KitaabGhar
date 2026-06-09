import express from 'express';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
} from '../controllers/cartController.js';
import { validateCart } from '../middleware/validation.js';

const router = express.Router();

router.get('/', getCart);
router.post('/add', validateCart, addToCart);
router.put('/update', validateCart, updateCartItem);
router.delete('/remove', removeFromCart);
router.delete('/clear', clearCart);

export default router;
