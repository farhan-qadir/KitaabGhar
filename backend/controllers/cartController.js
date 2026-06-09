import { Cart } from '../models/Cart.js';
import { Book } from '../models/Book.js';
import { isMongoConnected } from '../config/database.js';

// Demo carts for testing
const demoCarts = {};

// Get cart
export const getCart = async (req, res, next) => {
  try {
    const userId = req.body.userId || req.user?.id;

    if (!isMongoConnected()) {
      // Demo mode
      const cart = demoCarts[userId] || { items: [], totalPrice: 0 };
      return res.status(200).json({
        success: true,
        message: 'Cart fetched (DEMO MODE)',
        data: cart
      });
    }

    let cart = await Cart.findOne({ userId }).populate('items.bookId');
    if (!cart) {
      return res.status(200).json({
        success: true,
        message: 'Cart is empty',
        data: { items: [], totalPrice: 0 }
      });
    }

    res.status(200).json({
      success: true,
      message: 'Cart fetched successfully',
      data: cart
    });
  } catch (error) {
    next(error);
  }
};

// Add item to cart
export const addToCart = async (req, res, next) => {
  try {
    const { bookId, quantity } = req.body;
    const userId = req.body.userId || req.user?.id;

    if (!isMongoConnected()) {
      // Demo mode
      if (!demoCarts[userId]) {
        demoCarts[userId] = { items: [], totalPrice: 0 };
      }

      const cart = demoCarts[userId];

      // Find book in demo data (use a simple price for demo)
      const demoPrice = Math.floor(Math.random() * 300) + 100;

      const existingItem = cart.items.find(item => item.bookId === bookId);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({
          bookId,
          quantity,
          price: demoPrice
        });
      }

      cart.totalPrice = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      return res.status(200).json({
        success: true,
        message: 'Item added to cart (DEMO MODE)',
        data: cart
      });
    }

    // Real database mode
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    if (book.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient stock'
      });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find(item => item.bookId.toString() === bookId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        bookId,
        quantity,
        price: book.price
      });
    }

    // Calculate total
    cart.totalPrice = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    await cart.save();

    const populatedCart = await cart.populate('items.bookId');

    res.status(200).json({
      success: true,
      message: 'Item added to cart',
      data: populatedCart
    });
  } catch (error) {
    next(error);
  }
};

// Update cart item quantity
export const updateCartItem = async (req, res, next) => {
  try {
    const { bookId, quantity } = req.body;
    const userId = req.body.userId || req.user?.id;

    if (quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be greater than 0'
      });
    }

    if (!isMongoConnected()) {
      // Demo mode
      const cart = demoCarts[userId];
      if (!cart) {
        return res.status(404).json({
          success: false,
          message: 'Cart not found'
        });
      }

      const item = cart.items.find(item => item.bookId === bookId);
      if (!item) {
        return res.status(404).json({
          success: false,
          message: 'Book not in cart'
        });
      }

      item.quantity = quantity;
      cart.totalPrice = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      return res.status(200).json({
        success: true,
        message: 'Cart item updated (DEMO MODE)',
        data: cart
      });
    }

    // Real database mode
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    const item = cart.items.find(item => item.bookId.toString() === bookId);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Book not in cart'
      });
    }

    item.quantity = quantity;
    cart.totalPrice = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    await cart.save();

    const populatedCart = await cart.populate('items.bookId');

    res.status(200).json({
      success: true,
      message: 'Cart item updated',
      data: populatedCart
    });
  } catch (error) {
    next(error);
  }
};

// Remove item from cart
export const removeFromCart = async (req, res, next) => {
  try {
    const { bookId } = req.body;
    const userId = req.body.userId || req.user?.id;

    if (!isMongoConnected()) {
      // Demo mode
      const cart = demoCarts[userId];
      if (!cart) {
        return res.status(404).json({
          success: false,
          message: 'Cart not found'
        });
      }

      cart.items = cart.items.filter(item => item.bookId !== bookId);
      cart.totalPrice = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      return res.status(200).json({
        success: true,
        message: 'Item removed from cart (DEMO MODE)',
        data: cart
      });
    }

    // Real database mode
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    cart.items = cart.items.filter(item => item.bookId.toString() !== bookId);
    cart.totalPrice = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    await cart.save();

    const populatedCart = await cart.populate('items.bookId');

    res.status(200).json({
      success: true,
      message: 'Item removed from cart',
      data: populatedCart
    });
  } catch (error) {
    next(error);
  }
};

// Clear cart
export const clearCart = async (req, res, next) => {
  try {
    const userId = req.body.userId || req.user?.id;

    if (!isMongoConnected()) {
      // Demo mode
      const cart = demoCarts[userId];
      if (!cart) {
        return res.status(404).json({
          success: false,
          message: 'Cart not found'
        });
      }

      cart.items = [];
      cart.totalPrice = 0;

      return res.status(200).json({
        success: true,
        message: 'Cart cleared (DEMO MODE)',
        data: cart
      });
    }

    // Real database mode
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Cart cleared successfully',
      data: cart
    });
  } catch (error) {
    next(error);
  }
};
