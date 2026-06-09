// TEST MODE: Bypass MongoDB for Frontend Testing
// This allows you to test the frontend while setting up MongoDB Atlas

// After you set up MongoDB Atlas, delete this file and restart

const testBooks = [
  {
    _id: "test1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description: "A classic American novel set in the Jazz Age",
    price: 299.99,
    originalPrice: 499.99,
    stock: 50,
    category: "Fiction",
    isbn: "978-0-7432-7356-5",
    publisher: "Scribner",
    pages: 180,
    rating: 4.5
  },
  {
    _id: "test2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description: "A gripping tale of racial injustice and childhood innocence",
    price: 249.99,
    originalPrice: 399.99,
    stock: 45,
    category: "Fiction",
    isbn: "978-0-06-112008-4",
    publisher: "J.B. Lippincott",
    pages: 324,
    rating: 4.8
  },
  {
    _id: "test3",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    description: "A brief history of humankind from the Stone Age to modern times",
    price: 349.99,
    originalPrice: 599.99,
    stock: 60,
    category: "Non-Fiction",
    isbn: "978-0-06-231609-7",
    publisher: "Harper",
    pages: 443,
    rating: 4.4
  }
];

const testUsers = [
  {
    _id: "testuser1",
    name: "Test User",
    email: "test@example.com",
    password: "$2a$10$hashed_password",
    role: "user",
    isActive: true
  }
];

export { testBooks, testUsers };
