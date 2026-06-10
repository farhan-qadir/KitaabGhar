import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Heart, ShoppingCart, Trash2, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = async (book) => {
    try {
      await addToCart(book._id, 1);
      toast.success(`"${book.title}" added to cart!`);
    } catch {
      toast.error('Failed to add to cart. Please log in.');
    }
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Heart className="mx-auto h-16 w-16 text-slate-200 mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Your wishlist is empty</h2>
          <p className="text-slate-500 mb-6">Save books you love to find them again later.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-full font-semibold hover:bg-primary-700 transition-colors"
          >
            <BookOpen className="h-5 w-5" />
            Browse Books
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-1">My Wishlist</h1>
          <p className="text-slate-500">{wishlist.length} book{wishlist.length !== 1 ? 's' : ''} saved</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map(book => (
            <div key={book._id} className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
              {/* Cover */}
              <div className="relative h-52 bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
                {book.image ? (
                  <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-5xl font-bold text-primary-300 uppercase">
                    {book.title ? `${book.title.charAt(0)}${book.title.charAt(book.title.length - 1)}` : '??'}
                  </span>
                )}
                <button
                  onClick={() => removeFromWishlist(book._id)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-red-400 hover:text-red-600 hover:bg-red-50 shadow-sm transition-colors"
                  title="Remove from wishlist"
                >
                  <Heart className="h-5 w-5 fill-red-400" />
                </button>
              </div>

              {/* Info */}
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-semibold text-slate-900 text-base leading-tight mb-1 line-clamp-2">{book.title}</h3>
                <p className="text-sm text-slate-500 mb-3">{book.author}</p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-lg font-bold text-slate-900">Rs {book.price?.toFixed(2) || '0.00'}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => removeFromWishlist(book._id)}
                      className="p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-500 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleAddToCart(book)}
                      className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white text-sm rounded-full font-medium hover:bg-primary-700 transition-colors"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
