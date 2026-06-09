import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Book } from './models/Book.js';
import { connectDB } from './config/database.js';

dotenv.config();

const seedData = [
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    description: 'A classic American novel set in the Jazz Age.',
    price: 299.99,
    originalPrice: 499.99,
    stock: 50,
    category: 'Fiction',
    isbn: '978-0-7432-7356-5',
    publisher: 'Scribner',
    publishedDate: new Date('1925-04-10'),
    pages: 180,
    language: 'English',
    rating: 4.5
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    description: 'A gripping tale of racial injustice and childhood innocence.',
    price: 249.99,
    originalPrice: 399.99,
    stock: 45,
    category: 'Fiction',
    isbn: '978-0-06-112008-4',
    publisher: 'J.B. Lippincott',
    publishedDate: new Date('1960-07-11'),
    pages: 324,
    language: 'English',
    rating: 4.8
  },
  {
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    description: 'A brief history of humankind from the Stone Age to modern times.',
    price: 349.99,
    originalPrice: 599.99,
    stock: 60,
    category: 'Non-Fiction',
    isbn: '978-0-06-231609-7',
    publisher: 'Harper',
    publishedDate: new Date('2011-01-01'),
    pages: 443,
    language: 'English',
    rating: 4.4
  },
  {
    title: 'Harry Potter and the Philosopher\'s Stone',
    author: 'J.K. Rowling',
    description: 'The magical journey of a young wizard begins.',
    price: 199.99,
    originalPrice: 349.99,
    stock: 100,
    category: 'Fiction',
    isbn: '978-0-747-53269-9',
    publisher: 'Bloomsbury',
    publishedDate: new Date('1997-06-26'),
    pages: 309,
    language: 'English',
    rating: 4.9
  },
  {
    title: '1984',
    author: 'George Orwell',
    description: 'A dystopian novel about totalitarianism and surveillance.',
    price: 279.99,
    originalPrice: 449.99,
    stock: 35,
    category: 'Fiction',
    isbn: '978-0-452-28423-4',
    publisher: 'Secker & Warburg',
    publishedDate: new Date('1949-06-08'),
    pages: 328,
    language: 'English',
    rating: 4.7
  },
  {
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    description: 'Insights into the psychology of decision making.',
    price: 399.99,
    originalPrice: 699.99,
    stock: 40,
    category: 'Non-Fiction',
    isbn: '978-0-374-17778-1',
    publisher: 'Farrar, Straus and Giroux',
    publishedDate: new Date('2011-10-25'),
    pages: 512,
    language: 'English',
    rating: 4.3
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    // Clear existing books
    await Book.deleteMany({});
    console.log('Cleared existing books');

    // Insert sample data
    const insertedBooks = await Book.insertMany(seedData);
    console.log(`✅ ${insertedBooks.length} books inserted successfully`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
