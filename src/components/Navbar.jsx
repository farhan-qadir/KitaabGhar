import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import homeIcon from '../assets/home.png';
import bookIcon from '../assets/book.png';
import loginIcon from '../assets/enter.png';
import '../styles/Navbar.css';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
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
          <li className="nav-item">
            <Link to="/login" className={`nav-link ${isActive('/login')}`}>
              <img src={loginIcon} alt="Login" className="nav-icon" />
              <span className="nav-text">Login</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
