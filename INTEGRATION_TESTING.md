# Frontend-Backend Integration Testing Guide

## ✅ Integration Complete!

The frontend is now fully connected to the backend with:
- API service layer
- Authentication context
- Cart management
- Protected routes
- Loading & error handling

---

## Quick Start

### 1. Start Backend Server
```bash
cd backend
npm install
npm run dev
```
Backend running on: `http://localhost:5000`

### 2. Start Frontend Dev Server
```bash
npm run dev
```
Frontend running on: `http://localhost:5173` (or shown in terminal)

---

## Testing Checklist

### Phase 1: Basic Connectivity

- [ ] Backend server starts without errors
- [ ] Frontend loads on `http://localhost:5173`
- [ ] Navbar displays correctly with Home, Add Book, Login

### Phase 2: User Authentication

#### 2.1 Register New User
1. Click "Login" in navbar
2. Toggle to "Register" mode
3. Enter:
   - Name: `John Doe`
   - Email: `john@example.com`
   - Password: `password123`
4. Click "Register"

**Expected:**
- ✅ Successfully registered
- ✅ Redirected to Home page
- ✅ User name appears in navbar
- ✅ Token stored in localStorage

#### 2.2 Login Existing User
1. Click "Logout" to logout
2. Click "Login" in navbar
3. Enter:
   - Email: `john@example.com`
   - Password: `password123`
4. Click "Login"

**Expected:**
- ✅ Successfully logged in
- ✅ Redirected to Home page
- ✅ User name in navbar

#### 2.3 Login Error Handling
1. Try login with wrong password
2. Try login with non-existent email

**Expected:**
- ✅ Error message displayed
- ✅ Not redirected

### Phase 3: Book Management

#### 3.1 View Books (without login)
1. Go to Home page (should work without login)
2. Look for book grid

**Expected:**
- ✅ Books loaded from API
- ✅ Category filter buttons visible
- ✅ Books display with title, author, price

#### 3.2 Filter by Category
1. Click on different category buttons (Fiction, Non-Fiction, etc.)
2. Observe books change

**Expected:**
- ✅ Only selected category books shown
- ✅ "All Books" button shows everything

#### 3.3 Add Book (Protected Route)
1. Click "Add Book" without login

**Expected:**
- ✅ Redirected to Login page
- ✅ Cannot access without authentication

2. Login first, then click "Add Book"

**Expected:**
- ✅ Form displays with all fields
- ✅ Form has validation

#### 3.4 Add Book Form Validation
Try submitting with:
1. Empty title (< 3 characters)
2. Empty author
3. Negative price
4. Empty stock

**Expected:**
- ✅ Error messages for each invalid field

#### 3.5 Successfully Add Book
1. Fill all fields:
   ```
   Title: "The Great Gatsby"
   Author: "F. Scott Fitzgerald"
   Description: "A classic American novel"
   Price: 299.99
   Original Price: 499.99
   Category: "Fiction"
   Stock: 50
   ```
2. Click "Add Book"

**Expected:**
- ✅ Success message
- ✅ Redirected to Home
- ✅ New book appears in list

### Phase 4: Cart Functionality

#### 4.1 Add to Cart (Without Login)
1. On Home page, click "Add to Cart" on any book

**Expected:**
- ✅ Alert: "Please login to add items to cart"
- ✅ Not added to cart

#### 4.2 Add to Cart (With Login)
1. Login first
2. Click "Add to Cart" on a book

**Expected:**
- ✅ Alert: "Book added to cart!"
- ✅ Cart count in navbar increases
- ✅ Item added to backend

#### 4.3 Add Multiple Books
1. Add different books to cart
2. Watch cart count increase

**Expected:**
- ✅ Cart badge shows total items
- ✅ Each item tracked separately

#### 4.4 Add Same Book Twice
1. Add a book to cart
2. Click "Add to Cart" on same book again

**Expected:**
- ✅ Quantity increases (not duplicate item)
- ✅ Cart count increases

### Phase 5: Error Handling

#### 5.1 Network Error
1. Stop backend server
2. Try to load books or add book

**Expected:**
- ✅ Error message displayed
- ✅ Graceful error handling

#### 5.2 Invalid Book ID
Backend should handle gracefully

#### 5.3 Duplicate Email Registration
1. Register with same email twice

**Expected:**
- ✅ Error: "Email already registered"

---

## Testing Scenarios

### Scenario 1: First Time User Flow
1. Open app → See books (no login needed)
2. Click Add Book → Redirect to Login
3. Register with new account
4. Add a book
5. Login again with same credentials
6. Add another book to cart
7. See items in cart

### Scenario 2: Returning User
1. Login with existing credentials
2. See previously added books
3. Add books to cart
4. Logout and login again
5. Cart should be restored

### Scenario 3: Admin Flow (Future)
1. Login with admin account
2. Access to delete/edit books (when implemented)

---

## Browser Console Checks

Open browser DevTools (F12) → Console tab:

### Check for Errors
```javascript
// Should see NO red errors in console
```

### Check Network Requests
1. Go to Network tab
2. Perform actions (login, add book, etc.)
3. Look for API calls to `http://localhost:5000/api`

**Expected:**
- ✅ GET /api/books → 200 OK
- ✅ POST /api/users/register → 201 Created
- ✅ POST /api/users/login → 200 OK
- ✅ POST /api/cart/add → 200 OK

### Check Local Storage
```javascript
// In console:
localStorage.getItem('token')        // Should show JWT token
localStorage.getItem('user')         // Should show user JSON
```

---

## Data Flow Verification

### 1. Book Loading Flow
```
Home.jsx loads
  ↓
useEffect triggered
  ↓
bookAPI.getAll() called
  ↓
Fetch to http://localhost:5000/api/books
  ↓
Response: { success: true, data: [...] }
  ↓
setBooks() updates state
  ↓
Books rendered in grid
```

### 2. Login Flow
```
User fills form & submits
  ↓
userAPI.login() called
  ↓
Fetch to http://localhost:5000/api/users/login
  ↓
Response: { success: true, token, data: {...} }
  ↓
Save token & user to localStorage
  ↓
setUser() & setToken() update context
  ↓
Navigate to Home
  ↓
Navbar shows user name
```

### 3. Cart Flow
```
User clicks "Add to Cart"
  ↓
addToCart(bookId) called
  ↓
cartAPI.addToCart() called
  ↓
Fetch to http://localhost:5000/api/cart/add
  ↓
Response: { data: { items: [...], totalPrice: ... } }
  ↓
setCart() updates context
  ↓
cartItemCount increases
  ↓
Badge shows in navbar
```

---

## Common Issues & Solutions

### Issue: "Cannot find module '@/services/api'"
**Solution:** Check if `src/services/api.js` exists and path is correct

### Issue: "Backend not responding"
**Solution:**
1. Ensure backend is running: `npm run dev` in backend folder
2. Check MongoDB connection
3. Check backend console for errors

### Issue: "CORS error in console"
**Solution:**
1. Backend `.env` has correct `CORS_ORIGIN=http://localhost:5173`
2. Backend server restarted after env change

### Issue: "Cannot add to cart without login"
**Expected behavior** - User must login first. This is correct!

### Issue: "localStorage undefined"
**Solution:** Use private/incognito browser to reset storage

---

## Performance Checks

- [ ] Books load in < 2 seconds
- [ ] Login response < 1 second
- [ ] Add book form submits < 2 seconds
- [ ] No console errors
- [ ] No memory leaks (DevTools → Memory)

---

## Final Verification Checklist

```
Frontend Integration Status:
✅ API Service Layer: src/services/api.js
✅ Auth Context: src/context/AuthContext.jsx
✅ Cart Context: src/context/CartContext.jsx
✅ Protected Routes: src/components/PrivateRoute.jsx
✅ Login Page: src/pages/Login.jsx (with form)
✅ Home Page: Fetches from API
✅ AddBook Page: Creates books via API
✅ Navbar: Shows user info & cart count
✅ Environment Config: .env.local with API URL
✅ Error Handling: Loading & error states
✅ Local Storage: Token & user persistence

Backend Integration Status:
✅ Running on http://localhost:5000
✅ All endpoints functional
✅ MongoDB connected
✅ Authentication working
✅ Cart operations working
✅ Error responses correct
```

---

## Next Steps (Future Enhancements)

1. **Cart Page Component** - Display cart items with edit/delete
2. **Checkout Page** - Order placement
3. **Payment Integration** - Razorpay/Stripe
4. **Order History** - User orders
5. **Admin Dashboard** - Manage books/users
6. **Search** - Full-text search for books
7. **Reviews & Ratings** - User reviews
8. **Wishlist Page** - Saved books
9. **Image Upload** - Book cover images
10. **Email Notifications** - Order confirmations

---

## Support

If you encounter any issues:
1. Check browser console for errors
2. Check backend console for API errors
3. Verify .env.local has correct API URL
4. Ensure both servers are running
5. Try clearing localStorage: `localStorage.clear()`

Happy Testing! 🚀
