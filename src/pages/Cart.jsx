import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';

export default function Cart() {
  const { cart, cartItemCount, updateCartItem, removeFromCart, clearCart, loading, error } = useCart();

  const handleQuantityChange = async (bookId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await updateCartItem(bookId, newQuantity);
    } catch (err) {
      toast.error('Failed to update quantity');
    }
  };

  const handleRemove = async (bookId) => {
    try {
      await removeFromCart(bookId);
      toast.success('Item removed');
    } catch (err) {
      toast.error('Failed to remove item');
    }
  };

  const handleClear = async () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      try {
        await clearCart();
        toast.success('Cart cleared');
      } catch (err) {
        toast.error('Failed to clear cart');
      }
    }
  };

  const handleCheckout = () => {
    toast('Checkout flow is under construction.', { icon: '🚧' });
  };

  if (loading) return (
    <div className="min-h-[60vh] flex items-center justify-center bg-slate-50">
      <div className="animate-pulse flex flex-col items-center">
        <ShoppingBag className="w-12 h-12 text-slate-300 mb-4" />
        <div className="text-slate-500 text-lg font-medium">Loading your cart...</div>
      </div>
    </div>
  );

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-8 tracking-tight">Shopping Cart</h1>
        
        {cartItemCount === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 border-dashed p-16 flex flex-col items-center justify-center text-center">
            <ShoppingBag className="w-20 h-20 text-slate-200 mb-6" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h2>
            <p className="text-slate-500 mb-8 max-w-md">Looks like you haven't added any books to your cart yet. Discover your next great read today!</p>
            <Link to="/" className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-700 transition-colors shadow-sm">
              Browse Books <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 lg:items-start">
            
            {/* Cart Items List */}
            <div className="lg:col-span-8 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-8 lg:mb-0">
              <ul className="divide-y divide-slate-100">
                {cart.items.map((item) => (
                  <li key={item.bookId?._id || item.bookId} className="p-6 sm:p-8 flex flex-col sm:flex-row gap-6 hover:bg-slate-50/50 transition-colors">
                    
                    <div className="w-24 h-32 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0 border border-slate-200">
                      {item.bookId?.image ? (
                        <img src={item.bookId.image} alt={item.bookId?.title} className="w-full h-full object-cover rounded-lg" />
                      ) : (
                        <span className="text-primary-300 font-bold text-xl uppercase">
                          {item.bookId?.title ? item.bookId.title.substring(0,2) : '??'}
                        </span>
                      )}
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 leading-tight mb-1">
                            {item.bookId?.title || 'Unknown Book'}
                          </h3>
                          <p className="text-sm text-slate-500 mb-2">By {item.bookId?.author || 'Unknown Author'}</p>
                        </div>
                        <p className="text-lg font-bold text-primary-600">
                          Rs {item.price.toFixed(2)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-4 sm:mt-0">
                        <div className="flex items-center border border-slate-200 rounded-lg bg-white shadow-sm overflow-hidden w-fit">
                          <button 
                            onClick={() => handleQuantityChange(item.bookId?._id || item.bookId, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="p-2 text-slate-500 hover:bg-slate-100 disabled:opacity-50 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 font-semibold text-slate-900 border-x border-slate-200">{item.quantity}</span>
                          <button 
                            onClick={() => handleQuantityChange(item.bookId?._id || item.bookId, item.quantity + 1)}
                            className="p-2 text-slate-500 hover:bg-slate-100 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <button 
                          onClick={() => handleRemove(item.bookId?._id || item.bookId)}
                          className="flex items-center gap-1.5 text-sm font-medium text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-md transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4 bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8 sticky top-24">
              <h2 className="text-lg font-bold text-slate-900 mb-6 pb-4 border-b border-slate-100">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal ({cartItemCount} items)</span>
                  <span className="font-medium text-slate-900">Rs {cart.totalPrice?.toFixed(2) || 0}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping Estimate</span>
                  <span className="font-medium text-slate-900">Calculated at checkout</span>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-base font-bold text-slate-900">Estimated Total</span>
                  <span className="text-xl font-bold text-primary-600">Rs {cart.totalPrice?.toFixed(2) || 0}</span>
                </div>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-primary-600 text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg shadow-primary-600/30 hover:bg-primary-700 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                >
                  Checkout <ArrowRight className="w-5 h-5" />
                </button>
                <button 
                  onClick={handleClear}
                  className="w-full bg-white text-slate-600 font-medium py-3 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
