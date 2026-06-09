# KitaabGhar Backend API

A Node.js Express backend for the KitaabGhar online bookstore with MongoDB database integration.

## Features

- ✅ RESTful API architecture
- ✅ MongoDB database integration
- ✅ Request validation with express-validator
- ✅ Proper error handling
- ✅ HTTP status codes
- ✅ User authentication (JWT)
- ✅ Password hashing with bcryptjs
- ✅ CORS enabled
- ✅ Pagination support

## Project Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   ├── bookController.js    # Book operations
│   ├── userController.js    # User operations
│   └── cartController.js    # Cart operations
├── models/
│   ├── Book.js              # Book schema
│   ├── User.js              # User schema
│   └── Cart.js              # Cart schema
├── middleware/
│   ├── errorHandler.js      # Error handling middleware
│   └── validation.js        # Request validation
├── routes/
│   ├── bookRoutes.js        # Book endpoints
│   ├── userRoutes.js        # User endpoints
│   └── cartRoutes.js        # Cart endpoints
├── .env                     # Environment variables
├── .env.example             # Example env file
├── server.js                # Entry point
└── package.json             # Dependencies
```

## Installation

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
- Copy `.env.example` to `.env`
- Update `MONGODB_URI` with your MongoDB connection string
- Change `JWT_SECRET` to a secure value

4. Make sure MongoDB is running on `localhost:27017` or update the URI

## Running the Server

### Development mode (with auto-reload):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will start on `http://localhost:5000` by default.

## API Documentation

### Books API

#### Get All Books
```
GET /api/books
```
Query Parameters:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `category`: Filter by category
- `search`: Search in title or author
- `sortBy`: Sort field (default: createdAt)

Response:
```json
{
  "success": true,
  "message": "Books fetched successfully",
  "data": [...],
  "pagination": {
    "total": 50,
    "page": 1,
    "pages": 5
  }
}
```

#### Get Single Book
```
GET /api/books/:id
```

#### Create Book
```
POST /api/books
```
Body:
```json
{
  "title": "Book Title",
  "author": "Author Name",
  "description": "Description",
  "price": 299.99,
  "originalPrice": 499.99,
  "stock": 50,
  "category": "Fiction",
  "isbn": "978-0-xxx-xxxxx-x",
  "publisher": "Publisher Name",
  "pages": 300,
  "language": "English"
}
```

#### Update Book
```
PUT /api/books/:id
```

#### Delete Book
```
DELETE /api/books/:id
```

#### Get Categories
```
GET /api/books/categories
```

### Users API

#### Register User
```
POST /api/users/register
```
Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```
POST /api/users/login
```
Body:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get User Profile
```
GET /api/users/profile/:userId
```

#### Update User Profile
```
PUT /api/users/profile/:userId
```
Body:
```json
{
  "userId": "user_id",
  "name": "Updated Name",
  "phone": "+91-9876543210",
  "address": {
    "street": "123 Main St",
    "city": "City Name",
    "state": "State",
    "pincode": "123456",
    "country": "Country"
  }
}
```

#### Get All Users
```
GET /api/users
```

### Cart API

#### Get Cart
```
GET /api/cart
```

#### Add to Cart
```
POST /api/cart/add
```
Body:
```json
{
  "userId": "user_id",
  "bookId": "book_id",
  "quantity": 2
}
```

#### Update Cart Item
```
PUT /api/cart/update
```
Body:
```json
{
  "userId": "user_id",
  "bookId": "book_id",
  "quantity": 5
}
```

#### Remove from Cart
```
DELETE /api/cart/remove
```
Body:
```json
{
  "userId": "user_id",
  "bookId": "book_id"
}
```

#### Clear Cart
```
DELETE /api/cart/clear
```
Body:
```json
{
  "userId": "user_id"
}
```

## Error Handling

All errors follow this format:
```json
{
  "success": false,
  "message": "Error description",
  "errors": [] // Optional detailed errors
}
```

### HTTP Status Codes
- `200`: OK - Request successful
- `201`: Created - Resource created successfully
- `400`: Bad Request - Validation error or invalid input
- `401`: Unauthorized - Invalid credentials
- `404`: Not Found - Resource not found
- `500`: Internal Server Error - Server error

## Testing with Postman

1. Import the provided `KitaabGhar_API.postman_collection.json` into Postman
2. All endpoints are pre-configured with examples
3. Update `localhost:5000` if your server runs on a different port
4. Replace placeholder IDs with actual MongoDB ObjectIds

## Database Models

### Book Schema
- title: String (required)
- author: String (required)
- description: String (required)
- price: Number (required)
- originalPrice: Number
- stock: Number (required)
- category: String (required)
- image: String
- rating: Number
- isbn: String (unique)
- publisher: String
- publishedDate: Date
- pages: Number
- language: String
- isActive: Boolean

### User Schema
- name: String (required)
- email: String (required, unique)
- password: String (required)
- phone: String
- address: Object
- role: String (user/admin)
- isActive: Boolean
- profileImage: String

### Cart Schema
- userId: ObjectId (required, ref: User)
- items: Array of cart items
- totalPrice: Number
- lastUpdated: Date

## Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **dotenv**: Environment variables
- **cors**: Cross-origin resource sharing
- **express-validator**: Request validation
- **jsonwebtoken**: JWT authentication
- **bcryptjs**: Password hashing

## Next Steps

1. Implement JWT authentication middleware
2. Add role-based access control
3. Implement order management
4. Add payment gateway integration
5. Add image upload functionality
6. Implement email notifications
7. Add review and rating system

## Environment Variables

Create a `.env` file with:
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/kitaabghar
JWT_SECRET=your_secret_key_here
CORS_ORIGIN=http://localhost:5173
```

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check `MONGODB_URI` in `.env` file
- Verify connection string format

### Validation Errors
- Check request body format
- Ensure all required fields are provided
- Refer to model schema for valid data types

### Port Already in Use
- Change PORT in `.env` file
- Or kill the process using the port

## License

ISC
