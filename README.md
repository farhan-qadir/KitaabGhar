# 📚 Kitaab Ghar

## Buy & Sell Books with Ease

**Kitaab Ghar** is a Customer-to-Customer (C2C) online marketplace that enables students and book lovers to buy and sell new or used books directly with one another. The platform reduces the cost of purchasing books, encourages the reuse of educational resources, and provides a simple way for users to list, discover, and purchase books online.

## 🎯 Problem Statement

Students often purchase expensive textbooks that they no longer need after completing a semester. At the same time, other students struggle to find affordable books. Existing marketplaces are either too general, difficult to navigate for books, or lack features specifically designed for students.

**Kitaab Ghar** solves this problem by providing a dedicated platform where users can:

* Buy affordable used and new books.
* Sell books they no longer need.
* Search books easily using filters.
* Connect directly with sellers.

**Target Users**

* University students
* School students
* Teachers
* Book collectors
* General readers

---

# 🌐 Live Demo

**Live Website:** https://your-vercel-link.vercel.app

---

# ✨ Features

### User Authentication

* User registration
* Secure login/logout
* JWT authentication
* Protected routes

### Book Management

* Add new books
* Upload book images
* Edit book details
* Delete books
* View complete book information

### Book Marketplace

* Browse all available books
* Search books by title
* Filter books by category
* Filter by condition
* View seller information
* Responsive book listings

### Shopping Cart

* Add books to cart
* Update quantity
* Remove books from cart
* View order summary

### Checkout

* Delivery information
* Order summary
* Multiple payment method selection
* Place order

### User Dashboard

* Manage listed books
* View personal listings
* Edit profile

### Responsive Design

* Desktop compatible
* Tablet friendly
* Mobile responsive

---

# 🤖 AI-Powered Feature

## AI Book Description & Recommendation Assistant

Kitaab Ghar includes an AI-powered assistant that helps users create professional book listings and improve the buying experience.

### What the AI Does

* Generates attractive book descriptions.
* Creates SEO-friendly listing titles.
* Suggests the appropriate book category.
* Identifies the likely condition of a book based on user input.
* Recommends similar books based on title or category.
* Improves incomplete or poorly written descriptions.

### Example System Prompt

```
You are an AI assistant for Kitaab Ghar, a C2C book marketplace.

Your job is to help users create professional book listings.

Instructions:
- Generate clear and attractive book descriptions.
- Keep descriptions concise.
- Suggest the best category.
- Recommend keywords for better search.
- Mention the condition naturally.
- Never generate misleading information.
- Respond in a friendly and professional tone.
```

---

# 🛠 Technologies Used

## Frontend

* React.js
* React Router
* HTML5
* CSS3
* JavaScript (ES6)

## Backend

* Node.js
* Express.js

## Database

* MongoDB
* Mongoose

## Authentication

* JSON Web Token (JWT)
* bcrypt.js

## File Upload

* Multer

## AI

* OpenAI API (or your chosen AI model/provider)

## Deployment

* Vercel (Frontend)
* Render/Railway (Backend)
* MongoDB Atlas

## Version Control

* Git
* GitHub

---

# 📸 Screenshots

Add at least three screenshots.

### Home Page

*(Insert Screenshot)*

---

### Book Details

*(Insert Screenshot)*

---

### Shopping Cart

*(Insert Screenshot)*

---

### Checkout Page

*(Insert Screenshot)*

---

### User Dashboard

*(Insert Screenshot)*

---

# 🚀 Installation

## Clone the Repository

```bash
git clone https://github.com/yourusername/kitaabghar.git
```

Move into the project directory:

```bash
cd kitaabghar
```

Install frontend dependencies:

```bash
npm install
```

Install backend dependencies:

```bash
cd server
npm install
```

Create a `.env` file:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

OPENAI_API_KEY=your_api_key

NODE_ENV=development
```

Run the backend:

```bash
npm run dev
```

Run the frontend:

```bash
npm start
```

Open your browser:

```
http://localhost:3000
```

---

# 📂 Project Structure

```
KitaabGhar
│
├── client
│   ├── components
│   ├── pages
│   ├── assets
│   └── App.js
│
├── server
│   ├── controllers
│   ├── routes
│   ├── models
│   ├── middleware
│   └── server.js
│
├── public
├── package.json
└── README.md
```

---

# 🔮 Future Enhancements

* AI-powered price estimation
* AI chatbot for customer support
* Wishlist functionality
* Book exchange system
* Order tracking
* Online payment gateway integration
* Seller ratings and reviews
* Recommendation system using machine learning
* Mobile application

---

# 👨‍💻 Author

**Farhan Qadir Abdul Qadir**

Computer Science Graduate

GitHub: https://github.com/farhan-qadir

---

# 📄 License

This project was developed for educational purposes as a university final project. It is open for learning and demonstration.
