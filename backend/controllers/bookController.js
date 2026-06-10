import { Book } from '../models/Book.js';
import { isMongoConnected } from '../config/database.js';

// Demo data for when MongoDB is not connected
export const demoBooks = [
  {
    _id: "demo1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description: "A classic American novel set in the Jazz Age.",
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
    _id: "demo2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description: "A gripping tale of racial injustice and childhood innocence.",
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
    _id: "demo3",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    description: "A brief history of humankind from the Stone Age to modern times.",
    price: 349.99,
    originalPrice: 599.99,
    stock: 60,
    category: "Non-Fiction",
    isbn: "978-0-06-231609-7",
    publisher: "Harper",
    pages: 443,
    rating: 4.4
  },
  {
    _id: "demo4",
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    description: "The magical journey of a young wizard begins.",
    price: 199.99,
    originalPrice: 349.99,
    stock: 100,
    category: "Fiction",
    isbn: "978-0-747-53269-9",
    publisher: "Bloomsbury",
    pages: 309,
    rating: 4.9
  },
  {
    _id: "demo5",
    title: "1984",
    author: "George Orwell",
    description: "A dystopian novel about totalitarianism and surveillance.",
    price: 279.99,
    originalPrice: 449.99,
    stock: 35,
    category: "Fiction",
    isbn: "978-0-452-28423-4",
    publisher: "Secker & Warburg",
    pages: 328,
    rating: 4.7
  }
];

// Get all books with pagination and filters
export const getAllBooks = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, category, search, sortBy = 'createdAt' } = req.query;

    // If MongoDB not connected, return demo data
    if (!isMongoConnected()) {
      let filteredBooks = [...demoBooks];

      if (category) {
        filteredBooks = filteredBooks.filter(b => b.category === category);
      }
      if (search) {
        const lowerSearch = search.toLowerCase();
        filteredBooks = filteredBooks.filter(b =>
          b.title.toLowerCase().includes(lowerSearch) ||
          b.author.toLowerCase().includes(lowerSearch)
        );
      }

      const skip = (page - 1) * limit;
      const paginatedBooks = filteredBooks.slice(skip, skip + parseInt(limit));

      return res.status(200).json({
        success: true,
        message: 'Books fetched (DEMO MODE - MongoDB not connected)',
        data: paginatedBooks,
        pagination: {
          total: filteredBooks.length,
          page: parseInt(page),
          pages: Math.ceil(filteredBooks.length / limit)
        }
      });
    }

    // Normal MongoDB query
    const skip = (page - 1) * limit;
    let query = { isActive: true };

    if (category) query.category = category;
    if (search) query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { author: { $regex: search, $options: 'i' } }
    ];

    const books = await Book.find(query)
      .sort({ [sortBy]: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Book.countDocuments(query);

    res.status(200).json({
      success: true,
      message: 'Books fetched successfully',
      data: books,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get single book by ID
export const getBookById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isMongoConnected()) {
      const book = demoBooks.find(b => b._id === id);
      if (!book) {
        return res.status(404).json({
          success: false,
          message: 'Book not found'
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Book fetched (DEMO MODE)',
        data: book
      });
    }

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Book fetched successfully',
      data: book
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'Invalid book ID'
      });
    }
    next(error);
  }
};

// Create new book
export const createBook = async (req, res, next) => {
  try {
    if (!isMongoConnected()) {
      const newBook = {
        _id: "demo_" + Date.now(),
        ...req.body,
        createdAt: new Date().toISOString()
      };
      // Add to the top of our in-memory list
      demoBooks.unshift(newBook);
      
      return res.status(201).json({
        success: true,
        message: 'Book created successfully (DEMO MODE)',
        data: newBook
      });
    }

    const book = new Book(req.body);
    await book.save();

    res.status(201).json({
      success: true,
      message: 'Book created successfully',
      data: book
    });
  } catch (error) {
    next(error);
  }
};

// Update book
export const updateBook = async (req, res, next) => {
  try {
    if (!isMongoConnected()) {
      return res.status(503).json({
        success: false,
        message: 'Database not connected'
      });
    }

    const { id } = req.params;

    const book = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Book updated successfully',
      data: book
    });
  } catch (error) {
    next(error);
  }
};

// Delete book
export const deleteBook = async (req, res, next) => {
  try {
    if (!isMongoConnected()) {
      return res.status(503).json({
        success: false,
        message: 'Database not connected'
      });
    }

    const { id } = req.params;

    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Book deleted successfully',
      data: book
    });
  } catch (error) {
    next(error);
  }
};

// Get book categories
export const getCategories = async (req, res, next) => {
  try {
    if (!isMongoConnected()) {
      const categories = [...new Set(demoBooks.map(b => b.category))];
      return res.status(200).json({
        success: true,
        message: 'Categories fetched (DEMO MODE)',
        data: categories
      });
    }

    const categories = await Book.distinct('category', { isActive: true });

    res.status(200).json({
      success: true,
      message: 'Categories fetched successfully',
      data: categories
    });
  } catch (error) {
    next(error);
  }
};
