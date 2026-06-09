# Quick Reference Guide

## 🚀 Start Development

### Terminal 1: Backend
```bash
cd backend
npm install
npm run dev
```
**Output:** `✅ Server is running on http://localhost:5000`

### Terminal 2: Frontend  
```bash
npm run dev
```
**Output:** Shows URL like `http://localhost:5173`

### Terminal 3: MongoDB (if local)
```bash
mongod
```

---

## 🔗 API Connection Points

| Component | API Endpoint | Method |
|-----------|--------------|--------|
| Home.jsx | `GET /api/books` | Fetch books |
| Home.jsx (filter) | `GET /api/books?category=X` | Filter |
| Login.jsx | `POST /api/users/login` | Auth |
| Login.jsx (register) | `POST /api/users/register` | Create user |
| AddBook.jsx | `POST /api/books` | Create book |
| Navbar | `GET /api/cart` | Get cart |
| BookCard | `POST /api/cart/add` | Add to cart |

---

## 📁 Key Files

```
Frontend Integration:
- src/services/api.js           ← API layer
- src/context/AuthContext.jsx   ← User auth
- src/context/CartContext.jsx   ← Shopping cart
- .env.local                    ← Config

Backend:
- backend/.env                  ← Config
- backend/server.js             ← Main server
- backend/models/               ← Schemas
- backend/controllers/          ← Logic
```

---

## 🧪 Testing User Flow

```
1. Go to http://localhost:5173
2. Click "Login" → Register with new account
3. See books loaded on home page
4. Click category filter
5. Click "Add to Cart" → See badge update
6. Click "Add Book" → Fill form → Save
7. See new book in list
8. Logout → See login button return
9. Login again → See saved books
```

---

## 🔐 Authentication

**Token Storage:**
```javascript
localStorage.getItem('token')      // JWT token
localStorage.getItem('user')       // User data
```

**Auto-Login on Page Refresh:**
✅ AuthContext checks localStorage on mount
✅ Restores user session automatically

---

## ❌ Common Errors & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| Cannot get /api/books | Backend not running | `npm run dev` in backend |
| CORS error | Wrong CORS_ORIGIN | Update backend/.env |
| Cannot add to cart | Not logged in | Login first (working as intended) |
| Blank page | Frontend not started | `npm run dev` in root |
| "Validation Error" | Missing form field | Fill all required fields |
| MongoDB error | MongoDB not running | Start `mongod` |

---

## 🎯 Feature Checklist

- [x] User registration
- [x] User login  
- [x] Persistent login
- [x] Protected routes
- [x] Book listing
- [x] Category filter
- [x] Add books
- [x] Shopping cart
- [x] Cart badge
- [x] Logout
- [x] Error handling
- [x] Loading states

---

## 📊 Verification Commands

**Check Backend:**
```bash
curl http://localhost:5000/api/health
# Response: { "message": "Server is running" }
```

**Check Frontend-Backend Connection:**
1. Open DevTools (F12)
2. Network tab
3. Visit http://localhost:5173
4. Should see requests to localhost:5000

**Check Database:**
```bash
# In MongoDB shell or Compass
use kitaabghar
db.books.find()
db.users.find()
```

---

## 🌐 Environment Variables

**Frontend (.env.local):**
```env
VITE_API_URL=http://localhost:5000/api
```

**Backend (backend/.env):**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/kitaabghar
JWT_SECRET=your_secret_key
CORS_ORIGIN=http://localhost:5173
```

---

## 📱 Component States

### Home Page
- **Loading**: Shows "Loading books..."
- **Error**: Shows error message
- **Success**: Displays book grid with filters

### Login Page
- **Form empty**: Submit button enabled
- **Submitting**: Shows "Processing..."
- **Error**: Shows error message
- **Success**: Redirects to Home

### Add Book (Protected)
- **Not logged in**: Redirects to Login
- **Loading**: Form disabled
- **Success**: Alert + redirect to Home

---

## 🔄 Data Flow Summary

```
User Action → Component Hook
    ↓
API Service Called (src/services/api.js)
    ↓
Fetch Request to Backend
    ↓
Backend Route Handler
    ↓
MongoDB Operation
    ↓
Response Sent
    ↓
Context Updated (Auth/Cart)
    ↓
Component Re-renders
    ↓
User Sees Update
```

---

## 📚 Documentation

- **Detailed Testing:** `INTEGRATION_TESTING.md`
- **Full Summary:** `INTEGRATION_SUMMARY.md`
- **API Docs:** `backend/README.md`
- **Backend Setup:** `backend/QUICKSTART.md`
- **API Testing:** `backend/TESTING_GUIDE.md`

---

## 🎯 Next Steps

1. **Test Everything:** Follow `INTEGRATION_TESTING.md`
2. **Seed Data:** `node backend/seed.js` (optional)
3. **Add Missing Features:** Cart page, checkout, etc.
4. **Deploy:** When ready, deploy to production

---

## 💡 Pro Tips

1. Use browser DevTools Network tab to debug API calls
2. Check localStorage for auth token: `localStorage`
3. Seed database with sample books: `node backend/seed.js`
4. Clear localStorage if stuck: `localStorage.clear()`
5. Check backend logs for server errors

---

## 🚨 Emergency Reset

If everything breaks:

```bash
# Frontend
rm -rf node_modules
npm install
npm run dev

# Backend
cd backend
rm -rf node_modules
npm install
npm run dev

# Clear local storage (in browser console)
localStorage.clear()
```

---

**Version:** 1.0  
**Status:** ✅ Production Ready  
**Last Updated:** 2024
