import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddBook from './pages/AddBook';
import Login from './pages/Login';
import Cart from './pages/Cart';
import { PrivateRoute } from './components/PrivateRoute';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Router>
      <AuthProvider>
        <CartProvider>
          <Navbar />
          <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/add-book"
              element={
                <PrivateRoute>
                  <AddBook />
                </PrivateRoute>
              }
            />
          </Routes>
          </main>
          <Footer />
        </CartProvider>
      </AuthProvider>
    </Router>
    <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
