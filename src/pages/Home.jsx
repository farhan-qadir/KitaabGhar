import { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';
import { bookAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import { ArrowRight, BookOpen, Star, Mail } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState(() => localStorage.getItem('homeCategory') || '');
  const [categories, setCategories] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchBooks();
    fetchCategories();
    localStorage.setItem('homeCategory', category);
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
      toast.error('Failed to load books.');
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
      toast.success('Book added to cart!');
    } catch (err) {
      toast.error('Failed to add to cart.');
    }
  };

  const handleWishlist = (bookId) => {
    toast.success('Added to wishlist!');
  };

  const featuredBooks = books.slice(0, 4);

  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl z-10 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6 tracking-tight">
              Discover Your Next <span className="text-primary-600">Favorite Book</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0">
              Explore thousands of quality second-hand books at unbeatable prices. Join our community of readers and give a book a second life.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a href="#all-books" className="px-8 py-3.5 bg-primary-600 text-white rounded-full font-semibold shadow-lg shadow-primary-600/30 hover:bg-primary-700 hover:-translate-y-0.5 transition-all w-full sm:w-auto text-center flex items-center justify-center gap-2">
                <BookOpen className="h-5 w-5" />
                Browse Books
              </a>
              <a href="#featured" className="px-8 py-3.5 bg-white text-slate-700 border border-slate-200 rounded-full font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all w-full sm:w-auto text-center">
                Best Sellers
              </a>
            </div>
          </div>
          
          <div className="relative w-full max-w-lg lg:w-1/2 aspect-square z-10 hidden md:block">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-100 to-indigo-50 rounded-full blur-3xl opacity-60"></div>
            <div className="relative h-full w-full bg-white rounded-3xl border border-slate-100 shadow-2xl p-8 flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform duration-500">
               <div className="grid grid-cols-2 gap-4">
                  {featuredBooks.slice(0,4).map((book, i) => (
                     <div key={i} className={`bg-slate-100 rounded-lg overflow-hidden shadow-sm ${i % 2 === 0 ? '-translate-y-4' : 'translate-y-4'}`}>
                        {book.image ? (
                          <img src={book.image} className="w-full h-full object-cover" alt="" />
                        ) : (
                          <div className="w-32 h-40 flex items-center justify-center text-primary-300 font-bold text-2xl uppercase">
                            {book.title.substring(0,2)}
                          </div>
                        )}
                     </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      {featuredBooks.length > 0 && (
        <section id="featured" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Featured Books</h2>
              <p className="text-slate-500">Handpicked selections for you</p>
            </div>
            <a href="#all-books" className="hidden sm:flex items-center gap-2 text-primary-600 font-medium hover:text-primary-700 transition-colors">
              View All <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredBooks.map((book) => (
              <BookCard
                key={`featured-${book._id}`}
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
        </section>
      )}

      {/* Categories & All Books Section */}
      <section id="all-books" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Explore Our Collection</h2>
          
          {categories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mt-8">
              <button
                className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all shadow-sm ${category === '' ? 'bg-slate-900 text-white border-transparent' : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}
                onClick={() => setCategory('')}
              >
                All Books
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all shadow-sm ${category === cat ? 'bg-slate-900 text-white border-transparent' : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center mb-8 font-medium">
            Error: {error}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
              <div key={n} className="bg-white rounded-xl border border-slate-200 h-96 animate-pulse p-4 flex flex-col">
                <div className="bg-slate-200 h-48 rounded-lg mb-4"></div>
                <div className="bg-slate-200 h-4 rounded w-3/4 mb-2"></div>
                <div className="bg-slate-200 h-4 rounded w-1/2 mb-auto"></div>
                <div className="flex justify-between mt-4">
                   <div className="bg-slate-200 h-6 rounded w-16"></div>
                   <div className="bg-slate-200 h-8 w-8 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : books.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
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
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 border-dashed">
            <BookOpen className="mx-auto h-12 w-12 text-slate-300 mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-1">No books found</h3>
            <p className="text-slate-500">Try adjusting your category filter.</p>
          </div>
        )}
      </section>

      {/* Customer Reviews Section */}
      <section className="bg-slate-100 border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">What Our Readers Say</h2>
            <p className="text-slate-500">Join thousands of happy customers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah Jenkins', text: 'Found rare books I was searching for years. The condition was exactly as described and shipping was incredibly fast!' },
              { name: 'Michael Chen', text: 'KitaabGhar is my go-to place for second-hand books. The UI is clean and the checkout process is seamless.' },
              { name: 'Ayesha Khan', text: 'I love how easy it is to sell my old university textbooks here. A wonderful platform for book lovers.' }
            ].map((review, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex text-amber-400 mb-4">
                  {[1,2,3,4,5].map(n => <Star key={n} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-slate-600 mb-6 italic">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold">
                    {review.name.charAt(0)}
                  </div>
                  <span className="font-semibold text-slate-900">{review.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
    </div>
  );
}
