import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { bookAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import {
  ArrowLeft, ShoppingCart, Heart, BookOpen,
  Tag, Hash, Building2, FileText, Globe, Package, Trash2, AlertTriangle, X, Edit
} from 'lucide-react';
import toast from 'react-hot-toast';

// ── Confirmation Modal ──────────────────────────────────────────────────────
function ConfirmModal({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />
      {/* Dialog */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-4">
            <AlertTriangle className="h-7 w-7 text-red-500" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Delete this listing?</h3>
          <p className="text-slate-500 text-sm mb-6">
            This book will be permanently removed from the store. This action cannot be undone.
          </p>
          <div className="flex gap-3 w-full">
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors"
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { isAuthenticated, user } = useAuth();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const res = await bookAPI.getById(id);
        setBook(res.data);
      } catch (err) {
        setError('Book not found or failed to load.');
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const handleAddToCart = async () => {
    setAddingToCart(true);
    try {
      await addToCart(book._id, quantity);
      toast.success(`"${book.title}" added to cart!`);
    } catch {
      toast.error('Please log in to add to cart.');
    } finally {
      setAddingToCart(false);
    }
  };

  const handleDeleteConfirmed = async () => {
    setShowConfirm(false);
    setIsDeleting(true);
    try {
      await bookAPI.delete(book._id);
      toast.success("Listing deleted successfully");
      navigate('/');
    } catch (err) {
      toast.error(err.message || 'Failed to delete listing');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleWishlist = () => {
    if (book) toggleWishlist(book);
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="w-40 h-56 bg-slate-200 rounded-xl" />
        <div className="w-64 h-6 bg-slate-200 rounded" />
        <div className="w-40 h-4 bg-slate-200 rounded" />
      </div>
    </div>
  );

  if (error || !book) return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
      <BookOpen className="w-16 h-16 text-slate-300" />
      <h2 className="text-xl font-bold text-slate-700">{error || 'Book not found'}</h2>
      <button onClick={() => navigate(-1)} className="text-primary-600 font-medium hover:underline">
        ← Go Back
      </button>
    </div>
  );

  const wishlisted = isWishlisted(book._id);
  const discount = book.originalPrice && book.originalPrice > book.price
    ? Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)
    : null;

  const isOwner = isAuthenticated && user && book.sellerId && (user._id === book.sellerId || user.id === book.sellerId);

  const details = [
    { icon: Tag, label: 'Category', value: book.category },
    { icon: Hash, label: 'ISBN', value: book.isbn },
    { icon: Building2, label: 'Publisher', value: book.publisher },
    { icon: FileText, label: 'Pages', value: book.pages },
    { icon: Globe, label: 'Language', value: book.language || 'English' },
    { icon: Package, label: 'In Stock', value: book.stock > 0 ? `${book.stock} available` : 'Out of stock' },
  ].filter(d => d.value);

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={showConfirm}
        onConfirm={handleDeleteConfirmed}
        onCancel={() => setShowConfirm(false)}
      />

      <div className="max-w-6xl mx-auto">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <Link to="/" className="hover:text-primary-600 transition-colors">Home</Link>
          <span>/</span>
          <button onClick={() => navigate(-1)} className="hover:text-primary-600 transition-colors">Books</button>
          <span>/</span>
          <span className="text-slate-800 font-medium line-clamp-1">{book.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* LEFT — Book Cover */}
          <div className="lg:col-span-4 flex flex-col items-center gap-4">
            <div className="w-64 h-80 rounded-2xl bg-gradient-to-br from-primary-50 to-indigo-100 flex items-center justify-center shadow-xl border border-slate-200 overflow-hidden">
              {book.image ? (
                <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
              ) : (
                <span className="text-7xl font-extrabold text-primary-200 uppercase tracking-widest">
                  {book.title ? `${book.title.charAt(0)}${book.title.charAt(book.title.length - 1)}` : '??'}
                </span>
              )}
            </div>

            {/* Category badge */}
            {book.category && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium border border-primary-100">
                <Tag className="w-3.5 h-3.5" />
                {book.category}
              </span>
            )}
          </div>

          {/* RIGHT — Details */}
          <div className="lg:col-span-8">

            {/* Title & Author */}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-2">
              {book.title}
            </h1>
            <p className="text-lg text-slate-500 mb-6">by <span className="font-semibold text-slate-700">{book.author}</span></p>

            {/* Price Block */}
            <div className="flex items-center gap-4 mb-8 p-5 bg-white rounded-2xl border border-slate-200 shadow-sm w-fit">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-medium mb-0.5">Price</p>
                <p className="text-3xl font-extrabold text-slate-900">Rs {book.price?.toFixed(2)}</p>
              </div>
              {book.originalPrice && book.originalPrice > book.price && (
                <>
                  <div className="w-px h-10 bg-slate-200" />
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-medium mb-0.5">Original</p>
                    <p className="text-lg text-slate-400 line-through">Rs {book.originalPrice.toFixed(2)}</p>
                  </div>
                  {discount && (
                    <span className="ml-1 px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold">
                      {discount}% off
                    </span>
                  )}
                </>
              )}
            </div>

            {/* Description */}
            {book.description && (
              <div className="mb-8">
                <h2 className="text-base font-semibold text-slate-900 mb-2">About this book</h2>
                <p className="text-slate-600 leading-relaxed">{book.description}</p>
              </div>
            )}

            {/* Quantity + Actions */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              {/* Quantity selector */}
              <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden shadow-sm bg-white">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-4 py-3 text-slate-500 hover:bg-slate-50 transition-colors font-bold text-lg"
                >−</button>
                <span className="px-5 py-3 font-semibold text-slate-900 border-x border-slate-200 min-w-[3rem] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="px-4 py-3 text-slate-500 hover:bg-slate-50 transition-colors font-bold text-lg"
                >+</button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={addingToCart || book.stock === 0}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3.5 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/30 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
              >
                <ShoppingCart className="w-5 h-5" />
                {addingToCart ? 'Adding...' : book.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>

              {/* Wishlist */}
              <button
                onClick={handleWishlist}
                className={`flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border font-semibold transition-all ${
                  wishlisted
                    ? 'bg-red-50 text-red-500 border-red-200 hover:bg-red-100'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-red-300 hover:text-red-500'
                }`}
              >
                <Heart className={`w-5 h-5 ${wishlisted ? 'fill-red-500' : ''}`} />
                {wishlisted ? 'Wishlisted' : 'Wishlist'}
              </button>
            </div>

            {/* Book Details Grid */}
            {details.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-5">
                <h2 className="text-base font-semibold text-slate-900 mb-4">Book Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {details.map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                      <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-primary-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 font-medium">{label}</p>
                        <p className="text-sm font-semibold text-slate-800">{String(value)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Admin/Owner Actions */}
            {isOwner && (
              <div className="mt-8 pt-8 border-t border-slate-200">
                <h3 className="text-sm font-semibold text-slate-900 mb-4">Manage Listing</h3>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => navigate(`/edit-book/${book._id}`)}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors font-medium text-sm"
                  >
                    <Edit className="w-4 h-4" />
                    Edit Listing
                  </button>
                  <button
                    onClick={() => setShowConfirm(true)}
                    disabled={isDeleting}
                    className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium text-sm disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                    {isDeleting ? 'Deleting...' : 'Delete Listing'}
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Back Button */}
        <div className="mt-10">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-slate-600 hover:text-primary-600 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Books
          </button>
        </div>

      </div>
    </div>
  );
}
