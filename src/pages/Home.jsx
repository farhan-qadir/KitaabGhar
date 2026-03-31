import BookCard from '../components/BookCard';
import '../styles/Home.css';

export default function Home() {
  const books = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1507842217343-583f20270319?w=300&h=400&fit=crop',
      title: 'Trouble in Gangtok',
      author: 'N/A',
      originalPrice: 200,
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop',
      title: 'The Silent Patient',
      author: 'Alex Michaelides',
      originalPrice: 350,
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1519995186714-13066afad5ee?w=300&h=400&fit=crop',
      title: 'Educated',
      author: 'Tara Westover',
      originalPrice: 450,
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1543002588-d4d28dd9d8a3?w=300&h=400&fit=crop',
      title: 'Atomic Habits',
      author: 'James Clear',
      originalPrice: 500,
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=300&h=400&fit=crop',
      title: 'The Midnight Library',
      author: 'Matt Haig',
      originalPrice: 400,
    },
  ];

  const handleAddToCart = (bookId) => {
    console.log(`Added book ${bookId} to cart`);
  };

  const handleWishlist = (bookId) => {
    console.log(`Added book ${bookId} to wishlist`);
  };

  return (
    <div className="home-page">
      <div className="home-header">
        <h1>Welcome to KitaabGhar</h1>
        <p>Your marketplace for old books</p>
      </div>

      <div className="books-grid">
        {books.map((book) => (
          <BookCard
            key={book.id}
            image={book.image}
            title={book.title}
            author={book.author}
            originalPrice={book.originalPrice}
            onAddToCart={() => handleAddToCart(book.id)}
            onAddToWishlist={() => handleWishlist(book.id)}
          />
        ))}
      </div>
    </div>
  );
}
