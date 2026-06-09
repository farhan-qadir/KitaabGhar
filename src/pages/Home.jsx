import { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';
import { bookAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import '../styles/Home.css';

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchBooks();
    fetchCategories();
  }, [category]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const filters = category ? { category } : {};
      const response = await bookAPI.getAll(1, 20, filters);
      setBooks(response.data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch books');
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await bookAPI.getCategories();
      setCategories(response.data || []);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const handleAddToCart = async (bookId) => {
    try {
      await addToCart(bookId, 1);
      alert('Book added to cart!');
    } catch (err) {
      alert('Failed to add to cart: ' + err.message);
    }
  };

  const handleWishlist = (bookId) => {
    console.log(`Added book ${bookId} to wishlist`);
  };

  return (
    <div className="home-page">
      <div className="home-header">
        <h1>Welcome to KitaabGhar</h1>
        <p>Your marketplace for old books</p>
      </div>

      {categories.length > 0 && (
        <div className="category-filter">
          <button
            className={category === '' ? 'active' : ''}
            onClick={() => setCategory('')}
          >
            All Books
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              className={category === cat ? 'active' : ''}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {error && <div className="error-message">Error: {error}</div>}

      {loading ? (
        <div className="loading">Loading books...</div>
      ) : books.length > 0 ? (
        <div className="books-grid">
          {books.map((book) => (
            <BookCard
              key={book._id}
              id={book._id}
              image={book.image}
              title={book.title}
              author={book.author}
              originalPrice={book.price}
              onAddToCart={() => handleAddToCart(book._id)}
              onAddToWishlist={() => handleWishlist(book._id)}
            />
          ))}
        </div>
      ) : (
        <div className="no-books">No books found</div>
      )}
    </div>
  );
}
