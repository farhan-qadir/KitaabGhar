# API Testing Guide

## Tools for Testing
- **Postman**: Desktop app for comprehensive API testing
- **Thunder Client**: VS Code extension (lightweight)
- **cURL**: Command line tool
- **REST Client**: VS Code extension

## Getting Started with Postman

### 1. Import Collection
1. Open Postman
2. Click "Import"
3. Select `backend/KitaabGhar_API.postman_collection.json`
4. All requests are pre-configured

### 2. Set Environment Variables
1. Create a new Environment in Postman
2. Add variables:
   - `base_url`: `http://localhost:5000`
   - `userId`: (will be filled after user registration)
   - `bookId`: (will be filled after getting books)
   - `token`: (will be filled after login)

Use `{{variable_name}}` in URLs and bodies.

## Testing Workflow

### 1. Health Check
```
GET http://localhost:5000/api/health
```
Expected Response:
```json
{
  "message": "Server is running"
}
```

### 2. Create Sample Books
Use the **Create Book** request with sample data.

Body:
```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "description": "A classic American novel",
  "price": 299.99,
  "originalPrice": 499.99,
  "stock": 50,
  "category": "Fiction",
  "isbn": "978-0-7432-7356-5",
  "publisher": "Scribner",
  "pages": 180
}
```

Response:
```json
{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "_id": "65abc123...",
    "title": "The Great Gatsby",
    ...
  }
}
```

### 3. Get All Books
```
GET http://localhost:5000/api/books
```

Test Filters:
```
GET http://localhost:5000/api/books?page=1&limit=5&category=Fiction
```

### 4. Register User
Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

Save the returned `token` and `id` for later use.

### 5. Login User
Body:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### 6. Add to Cart
Body:
```json
{
  "userId": "65abc123...",
  "bookId": "65abc456...",
  "quantity": 2
}
```

### 7. Get Cart
Body:
```json
{
  "userId": "65abc123..."
}
```

## Testing Scenarios

### Scenario 1: Complete Purchase Flow
1. Register user → save userId and token
2. Get all books → save first bookId
3. Add to cart → verify item added
4. Update cart → change quantity
5. Get cart → verify updated quantity
6. Remove from cart → verify item removed
7. Add to cart again → add another book
8. Clear cart → verify empty cart

### Scenario 2: Book Management (Admin)
1. Create multiple books
2. Get all books with pagination
3. Get single book
4. Update book price/stock
5. Delete book
6. Verify book is deleted

### Scenario 3: User Management
1. Register multiple users
2. Login with valid credentials
3. Get user profile
4. Update user profile with address
5. Verify updates

## Error Testing

### Test Invalid Requests

#### Missing Required Field
```json
{
  "title": "Test",
  "author": "Author"
  // missing description, price, etc.
}
```
Expected: 400 Bad Request

#### Invalid Email Format
```json
{
  "name": "John",
  "email": "invalid-email",
  "password": "pass123"
}
```
Expected: 400 Bad Request

#### Invalid Book ID
```
GET http://localhost:5000/api/books/invalid-id
```
Expected: 400 Bad Request

#### Duplicate Email
Register user twice with same email.
Expected: 400 Bad Request with "Email already registered"

#### Invalid Credentials
```json
{
  "email": "john@example.com",
  "password": "wrongpassword"
}
```
Expected: 401 Unauthorized

#### Not Found
```
GET http://localhost:5000/api/books/65abc123999999999999999
```
Expected: 404 Not Found

## Validation Testing

### Book Creation Validation
- Title: minimum 3 characters
- Author: required
- Price: must be number ≥ 0
- Stock: must be integer ≥ 0
- Category: required

### User Registration Validation
- Name: required
- Email: valid format
- Password: minimum 6 characters

### Cart Validation
- BookId: required (valid MongoDB ID)
- Quantity: minimum 1

## Performance Testing

### Test Pagination
```
GET http://localhost:5000/api/books?page=1&limit=50
GET http://localhost:5000/api/books?page=2&limit=50
```

### Test Search
```
GET http://localhost:5000/api/books?search=Gatsby
```

### Test Filtering
```
GET http://localhost:5000/api/books?category=Fiction&sortBy=price
```

## Response Verification Checklist

- [ ] Status code is correct (200, 201, 400, 401, 404, 500)
- [ ] `success` field is accurate
- [ ] `message` is descriptive
- [ ] `data` contains expected fields
- [ ] No sensitive data exposed (passwords hidden)
- [ ] Timestamps are present (createdAt, updatedAt)
- [ ] Errors are informative

## Common Test Cases by Endpoint

### GET /api/books
- ✅ Get all books (default pagination)
- ✅ Get with page parameter
- ✅ Get with category filter
- ✅ Get with search query
- ✅ Get with invalid page number

### POST /api/books
- ✅ Create with valid data
- ✅ Create with missing required field
- ✅ Create with invalid price (negative)
- ✅ Create with duplicate ISBN
- ✅ Create with invalid category format

### POST /api/users/register
- ✅ Register new user
- ✅ Register with existing email
- ✅ Register with invalid email
- ✅ Register with short password
- ✅ Register with missing field

### POST /api/users/login
- ✅ Login with correct credentials
- ✅ Login with wrong password
- ✅ Login with non-existent email
- ✅ Login with missing field

### POST /api/cart/add
- ✅ Add to cart (new user)
- ✅ Add same book twice (quantity increases)
- ✅ Add with invalid bookId
- ✅ Add with quantity > stock
- ✅ Add with quantity 0

## Tips for Effective Testing

1. **Use Environment Variables**: Store base URL and IDs for reuse
2. **Document Test Results**: Keep notes on edge cases found
3. **Test in Sequence**: Follow logical flow (register → login → add to cart)
4. **Verify Error Responses**: Check error messages are clear
5. **Test Boundary Cases**: Empty strings, zero values, large numbers
6. **Check Database**: Verify data persists in MongoDB
7. **Monitor Console**: Watch server logs for errors
8. **Test Concurrency**: Try multiple simultaneous requests

## Automated Testing Ideas

Consider adding:
- Postman test scripts (Tests tab)
- Jest unit tests for controllers
- Supertest for integration tests
- Automated API testing with CI/CD

Good luck with your testing! 🚀
