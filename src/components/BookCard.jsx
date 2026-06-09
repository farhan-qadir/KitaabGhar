import { useState } from 'react';
import '../styles/BookCard.css';

export default function BookCard({
  id,
  image,
  title,
  author,
  originalPrice,
  onAddToCart,
  onAddToWishlist
}) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    if (onAddToWishlist) {
      onAddToWishlist();
    }
  };

  const titleInitials = title ? `${title.charAt(0)}${title.charAt(title.length - 1)}` : '';

  return (
    <div className="book-card">
      {/* Image Container */}
      <div className="book-image-container">
        <div className="title-initials">{titleInitials}</div>

        {/* Wishlist Button */}
        <button
          className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={handleWishlist}
          title="Add to Wishlist"
        >
          ♥
        </button>
      </div>

      {/* Book Info */}
      <div className="book-info">
        <h3 className="book-title">{title}</h3>
        <p className="book-author">By: {author}</p>

        {/* Price Section */}
        <div className="price-section">
          {originalPrice && (
            <span className="original-price">Rs {originalPrice.toFixed(2)}</span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          className="add-to-cart-btn"
          onClick={onAddToCart}
        >
          <span className="cart-icon">🛒</span>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
