import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('kg_wishlist') || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('kg_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (book) => {
    setWishlist(prev => {
      if (prev.find(b => b._id === book._id)) {
        toast('Already in wishlist', { icon: '💛' });
        return prev;
      }
      toast.success(`"${book.title}" added to wishlist!`);
      return [...prev, book];
    });
  };

  const removeFromWishlist = (bookId) => {
    setWishlist(prev => prev.filter(b => b._id !== bookId));
    toast.success('Removed from wishlist');
  };

  const toggleWishlist = (book) => {
    const exists = wishlist.find(b => b._id === book._id);
    if (exists) {
      removeFromWishlist(book._id);
    } else {
      addToWishlist(book);
    }
  };

  const isWishlisted = (bookId) => !!wishlist.find(b => b._id === bookId);

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, toggleWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
};
