import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Search, ShoppingCart, Heart, User, LogOut, Menu } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const { cartItemCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path ? 'text-primary-600 font-semibold' : 'text-slate-600 hover:text-primary-600';

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo & Primary Nav */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <img src="/src/assets/logo.png" alt="KitaabGhar" className="h-8 w-auto" />
              <span className="text-xl font-bold text-slate-900 hidden sm:block">KitaabGhar</span>
            </Link>

            <div className="hidden md:flex gap-6">
              <Link to="/" className={`text-sm transition-colors ${isActive('/')}`}>Home</Link>
              <a href="/#all-books" className="text-sm text-slate-600 hover:text-primary-600 transition-colors">Books</a>
              <a href="/#all-books" className="text-sm text-slate-600 hover:text-primary-600 transition-colors">Categories</a>
              <Link to="/add-book" className={`text-sm transition-colors ${isActive('/add-book')}`}>Sell Book</Link>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input 
                type="text" 
                placeholder="Search books, authors, ISBN..." 
                className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-full leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button className="text-slate-600 hover:text-primary-600 transition-colors hidden sm:block">
              <Heart className="h-5 w-5" />
            </button>
            
            <Link to="/cart" className="text-slate-600 hover:text-primary-600 transition-colors relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-slate-700">
                  <div className="h-8 w-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="max-w-[100px] truncate">{user?.name}</span>
                </div>
                <button onClick={logout} className="text-slate-600 hover:text-red-600 transition-colors" title="Logout">
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="flex items-center gap-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-full transition-colors shadow-sm">
                <User className="h-4 w-4" />
                <span className="hidden sm:block">Sign In</span>
              </Link>
            )}

            {/* Mobile menu button */}
            <button 
              className="md:hidden text-slate-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg">
          <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-slate-900 hover:bg-slate-50">Home</Link>
          <Link to="/add-book" className="block px-3 py-2 rounded-md text-base font-medium text-slate-900 hover:bg-slate-50">Sell Book</Link>
          <div className="mt-4 px-3">
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full px-4 py-2 border border-slate-200 rounded-md bg-slate-50 focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      )}
    </nav>
  );
}
