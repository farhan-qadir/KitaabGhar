# Quick Start Guide - KitaabGhar Backend

## Prerequisites
- Node.js (v16 or higher)
- MongoDB (running locally or MongoDB Atlas connection string)
- Git
- Postman (for API testing)

## Step 1: Navigate to Backend Directory
```bash
cd backend
```

## Step 2: Install Dependencies
```bash
npm install
```

## Step 3: Configure Environment
Create a `.env` file (or copy from `.env.example`):

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/kitaabghar
JWT_SECRET=your_super_secret_key_here_change_in_production
CORS_ORIGIN=http://localhost:5173
```

### For MongoDB Atlas:
Replace `MONGODB_URI` with:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/kitaabghar?retryWrites=true&w=majority
```

## Step 4: Start MongoDB (if using local MongoDB)
```bash
mongod
```

## Step 5: Start the Backend Server
### Development mode (with auto-reload):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

You should see:
```
✅ Server is running on http://localhost:5000
✅ MongoDB connected successfully
```

## Step 6: Test the API

### Using Postman:
1. Import `KitaabGhar_API.postman_collection.json` into Postman
2. Start making requests from the collection

### Using cURL:
```bash
# Test health check
curl http://localhost:5000/api/health

# Get all books
curl http://localhost:5000/api/books

# Register a user
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

## Step 7: Seed Sample Data (Optional)

To populate the database with sample books:

```bash
node seed.js
```

This will insert 6 sample books into the database.

## Directory Structure Overview

```
backend/
├── config/          # Database configuration
├── controllers/     # Business logic
├── models/          # Database schemas
├── middleware/      # Custom middleware
├── routes/          # API endpoints
├── .env             # Configuration (DO NOT COMMIT)
├── .env.example     # Example config
├── server.js        # Entry point
├── seed.js          # Database seeding
└── package.json     # Dependencies
```

## Common Issues & Solutions

### MongoDB Connection Fails
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:**
- Ensure MongoDB is running: `mongod`
- Check MongoDB URI in `.env`
- If using Atlas, ensure IP is whitelisted

### Port 5000 Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:**
- Change PORT in `.env` to another value (e.g., 5001)
- Or kill the process: `lsof -ti:5000 | xargs kill`

### Validation Error on POST Request
```
Validation Error: Title is required
```
**Solution:**
- Ensure all required fields are in request body
- Check field names match the schema

## API Quick Reference

### Books
- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get single book
- `POST /api/books` - Create book (admin)
- `PUT /api/books/:id` - Update book (admin)
- `DELETE /api/books/:id` - Delete book (admin)
- `GET /api/books/categories` - Get all categories

### Users
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile/:userId` - Get user profile
- `PUT /api/users/profile/:userId` - Update profile
- `GET /api/users` - Get all users (admin)

### Cart
- `GET /api/cart` - Get cart
- `POST /api/cart/add` - Add to cart
- `PUT /api/cart/update` - Update quantity
- `DELETE /api/cart/remove` - Remove item
- `DELETE /api/cart/clear` - Clear cart

## Next Steps

1. **Connect Frontend**: Update frontend API endpoints to point to `http://localhost:5000/api`
2. **Add Authentication**: Implement JWT middleware for protected routes
3. **Add Order Management**: Create Order model and endpoints
4. **Add Payments**: Integrate payment gateway (Stripe, Razorpay)
5. **Add Reviews**: Implement review and rating system
6. **Deploy**: Deploy to Heroku, Railway, or Render

## Need Help?

Refer to `README.md` for detailed API documentation or check individual files in their respective directories.

## Happy Coding! 🚀
