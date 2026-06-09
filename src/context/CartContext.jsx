import { createContext, useContext, useState, useEffect } from 'react';
import { cartAPI } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState({ items: [], totalPrice: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch cart when user logs in
  useEffect(() => {
    if (user?.id) {
      fetchCart();
    }
  }, [user]);

  const fetchCart = async () => {
    if (!user?.id) return;
    try {
      setLoading(true);
      setError(null);
      const response = await cartAPI.getCart(user.id);
      setCart(response.data || { items: [], totalPrice: 0 });
    } catch (err) {
      setError(err.message);
      setCart({ items: [], totalPrice: 0 });
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (bookId, quantity = 1) => {
    if (!user?.id) {
      setError('Please login to add items to cart');
      return;
    }

    try {
      setError(null);
      const response = await cartAPI.addToCart(user.id, bookId, quantity);
      setCart(response.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateCartItem = async (bookId, quantity) => {
    if (!user?.id) {
      setError('Please login to update cart');
      return;
    }

    try {
      setError(null);
      const response = await cartAPI.updateItem(user.id, bookId, quantity);
      setCart(response.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const removeFromCart = async (bookId) => {
    if (!user?.id) {
      setError('Please login to remove items');
      return;
    }

    try {
      setError(null);
      const response = await cartAPI.removeItem(user.id, bookId);
      setCart(response.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const clearCart = async () => {
    if (!user?.id) {
      setError('Please login to clear cart');
      return;
    }

    try {
      setError(null);
      const response = await cartAPI.clearCart(user.id);
      setCart(response.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const cartItemCount = cart.items?.length || 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        cartItemCount,
        loading,
        error,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        fetchCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
