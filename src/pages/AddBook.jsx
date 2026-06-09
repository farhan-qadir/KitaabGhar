import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookAPI } from '../services/api';
import toast from 'react-hot-toast';
import { BookPlus, Tag, User as UserIcon, AlignLeft, IndianRupee, Hash, Library } from 'lucide-react';

export default function AddBook() {
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('addBookForm');
    if (saved) return JSON.parse(saved);
    return {
      title: '', author: '', description: '', price: '', originalPrice: '',
      stock: '', category: 'Fiction', isbn: '', publisher: '', pages: ''
    };
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const categories = ['Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Science', 'History', 'Biography', 'Self-Help'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      localStorage.setItem('addBookForm', JSON.stringify(updated));
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const bookData = {
        ...formData,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : parseFloat(formData.price),
        stock: parseInt(formData.stock),
        pages: formData.pages ? parseInt(formData.pages) : null
      };

      await bookAPI.create(bookData);
      localStorage.removeItem('addBookForm');
      toast.success('Book successfully listed for sale!');
      navigate('/');
    } catch (err) {
      toast.error(err.message || 'Failed to add book');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center justify-center gap-3">
            <BookPlus className="h-8 w-8 text-primary-600" />
            Sell a Book
          </h1>
          <p className="mt-2 text-lg text-slate-600">
            List your second-hand book and find it a new home.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden">
          <div className="p-8 sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Basic Info */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4 border-b border-slate-100 pb-2">Basic Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Book Title *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Tag className="h-5 w-5 text-slate-400" />
                      </div>
                      <input type="text" name="title" value={formData.title} onChange={handleChange} required className="pl-10 w-full px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm" placeholder="The Great Gatsby" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Author *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <UserIcon className="h-5 w-5 text-slate-400" />
                      </div>
                      <input type="text" name="author" value={formData.author} onChange={handleChange} required className="pl-10 w-full px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm" placeholder="F. Scott Fitzgerald" />
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Description *</label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <AlignLeft className="h-5 w-5 text-slate-400" />
                    </div>
                    <textarea name="description" value={formData.description} onChange={handleChange} required rows="4" className="pl-10 w-full px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm" placeholder="Describe the book's condition, synopsis, and any notes..."></textarea>
                  </div>
                </div>
              </div>

              {/* Pricing & Inventory */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4 border-b border-slate-100 pb-2">Pricing & Inventory</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Selling Price (Rs) *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <IndianRupee className="h-5 w-5 text-slate-400" />
                      </div>
                      <input type="number" step="0.01" min="0" name="price" value={formData.price} onChange={handleChange} required className="pl-10 w-full px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm" placeholder="499" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1 text-slate-500">Original Price (Rs)</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <IndianRupee className="h-5 w-5 text-slate-300" />
                      </div>
                      <input type="number" step="0.01" min="0" name="originalPrice" value={formData.originalPrice} onChange={handleChange} className="pl-10 w-full px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm" placeholder="799" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Stock Quantity *</label>
                    <input type="number" min="1" name="stock" value={formData.stock} onChange={handleChange} required className="w-full px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm" placeholder="1" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Category *</label>
                    <select name="category" value={formData.category} onChange={handleChange} required className="w-full px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm bg-white">
                      {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4 border-b border-slate-100 pb-2 text-slate-500">Additional Details (Optional)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">ISBN</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Hash className="h-5 w-5 text-slate-400" />
                      </div>
                      <input type="text" name="isbn" value={formData.isbn} onChange={handleChange} className="pl-10 w-full px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm" placeholder="978-3-16-148410-0" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Publisher</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Library className="h-5 w-5 text-slate-400" />
                      </div>
                      <input type="text" name="publisher" value={formData.publisher} onChange={handleChange} className="pl-10 w-full px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm" placeholder="Penguin Books" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Number of Pages</label>
                    <input type="number" min="1" name="pages" value={formData.pages} onChange={handleChange} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm" placeholder="350" />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button type="submit" disabled={loading} className="w-full py-3 px-4 border border-transparent rounded-lg shadow-lg shadow-primary-600/30 text-base font-semibold text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed hover:-translate-y-0.5 flex justify-center items-center gap-2">
                  <BookPlus className="h-5 w-5" />
                  {loading ? 'Publishing Listing...' : 'Publish Listing'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
