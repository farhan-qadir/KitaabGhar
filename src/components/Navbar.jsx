import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import logo from '../assets/logo.png';
import homeIcon from '../assets/home.png';
import bookIcon from '../assets/book.png';
import loginIcon from '../assets/enter.png';
import '../styles/Navbar.css';

export default function Navbar() {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const { cartItemCount } = useCart();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="KitaabGhar Logo" className="logo-image" />
          <span className="logo-text">KitaabGhar</span>
        </Link>

        {/* Navigation Links */}
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className={`nav-link ${isActive('/')}`}>
              <img src={homeIcon} alt="Home" className="nav-icon" />
              <span className="nav-text">Home</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/add-book" className={`nav-link ${isActive('/add-book')}`}>
              <img src={bookIcon} alt="Add Book" className="nav-icon" />
              <span className="nav-text">Add Book</span>
            </Link>
          </li>

          {/* Cart Icon */}
          <li className="nav-item cart-item">
            <a href="#cart" className="nav-link">
              🛒
              {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
            </a>
          </li>

          {/* User Section */}
          {isAuthenticated ? (
            <li className="nav-item user-section">
              <span className="user-name">{user?.name}</span>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </li>
          ) : (
            <li className="nav-item">
              <Link to="/login" className={`nav-link ${isActive('/login')}`}>
                <img src={loginIcon} alt="Login" className="nav-icon" />
                <span className="nav-text">Login</span>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
