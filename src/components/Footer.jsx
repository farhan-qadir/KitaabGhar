import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Column 1: Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src="/src/assets/logo.png" alt="KitaabGhar Logo" className="h-8 w-auto" />
              <span className="text-xl font-bold text-slate-900">KitaabGhar</span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed">
              Your premier marketplace for discovering and sharing the joy of reading through quality second-hand books.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-slate-500 hover:text-primary-600 transition-colors text-sm">Home</Link></li>
              <li><a href="/#all-books" className="text-slate-500 hover:text-primary-600 transition-colors text-sm">Books</a></li>
              <li><a href="/#all-books" className="text-slate-500 hover:text-primary-600 transition-colors text-sm">Categories</a></li>
              <li><a href="#" className="text-slate-500 hover:text-primary-600 transition-colors text-sm">About Us</a></li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Support</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-500 hover:text-primary-600 transition-colors text-sm">Contact Us</a></li>
              <li><a href="#" className="text-slate-500 hover:text-primary-600 transition-colors text-sm">FAQ</a></li>
              <li><a href="#" className="text-slate-500 hover:text-primary-600 transition-colors text-sm">Shipping Policy</a></li>
              <li><a href="#" className="text-slate-500 hover:text-primary-600 transition-colors text-sm">Returns Policy</a></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Subscribe to Newsletter</h3>
            <p className="text-slate-500 text-sm mb-4">
              Get updates on new arrivals and special offers.
            </p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full px-4 py-2 border border-slate-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              />
              <button 
                type="submit" 
                className="bg-primary-600 text-white px-4 py-2 rounded-r-md hover:bg-primary-700 transition-colors font-medium text-sm whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
          
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © 2026 KitaabGhar. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-500 hover:text-primary-600 text-sm">Privacy Policy</a>
            <a href="#" className="text-slate-500 hover:text-primary-600 text-sm">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
