# 📚 Book Management REST API

This is a RESTful API for managing books, authors, publishers, and users with authentication and search functionality. It is part of an academic assignment for the **Master's in Web Sciences** program at the **Syrian Virtual University (SVU)**.

**Author:** Ghayth Moustapha  | ghayth_283084 
**Course:** Mobile Web	 | MWS_WMB_C1_F24	
**Year:** 2025

---

## 📌 Features

- User authentication (sign up, login with JWT)
- Admin authorization to manage books, authors, publishers
- CRUD operations:
  - 📖 Book
  - 🖊️ Author
  - 🏢 Publisher
  - 👤 User
- Search functionality for:
  - Book titles
  - Author names
  - Publisher names
- View book details including associated author and publisher
- Dockerized for easy deployment

---

## 🛠️ Technologies Used

- Node.js with Express.js
- MongoDB (via Docker)
- JWT for authentication
- bcrypt for password hashing
- Docker & Docker Compose for containerization

---

## 📁 Project Structure

```

book-api/
├── src/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── index.js
├── Dockerfile
├── docker-compose.yml
└── README.md

````

---

## 🚀 Setup Instructions

### 1. Prerequisites

Ensure you have the following installed:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### 2. Clone the Repository

```bash
git clone https://github.com/your-username/book-api.git
cd book-api
````

### 3. Build and Run with Docker

```bash
docker-compose up --build
```

The API will be available at:
👉 `http://localhost:34723`

### 4. Environment Variables

In `.env` (already included in Dockerfile):

```env
MONGO_URI=mongodb://mongo:27017/bookdb
JWT_SECRET=supersecret
```

---

## 🔐 Authentication

* Sign up: `POST /api/auth/signup`
* Login: `POST /api/auth/login`
  → Returns a JWT token. Use in `Authorization: Bearer <token>` header.

---

## 📚 API Routes Overview

### ✅ Public Routes

* `GET /api/books` → List all books
* `GET /api/books/:id` → Get book details
* `GET /api/books/search/:q` → Search books by title
* `GET /api/authors?q=name` → Search authors
* `GET /api/authors/:id/books` → Books by author
* `GET /api/publishers?q=name` → Search publishers
* `GET /api/publishers/:id/books` → Books by publisher

### 🔒 Protected (Admin) Routes

Require token in `Authorization` header:

* `POST /api/books` → Add book
* `POST /api/authors` → Add author
* `POST /api/publishers` → Add publisher

---

## 📦 Example API Requests

### Sign Up

```http
POST /api/auth/signup
{
  "username": "admin",
  "password": "123456",
  "firstName": "Ghayth",
  "lastName": "Moustapha",
  "isAdmin": true
}
```

### Login

```http
POST /api/auth/login
{
  "username": "admin",
  "password": "123456"
}
```

### Add Book (with token)

```http
POST /api/books
Authorization: Bearer <JWT_TOKEN>
{
  "title": "Modern Web Science",
  "type": "Textbook",
  "price": 29.99,
  "publisherId": "<PUBLISHER_ID>",
  "authorId": "<AUTHOR_ID>"
}
```

---

## 📎 Notes

* Book can have multiple authors, but only one (the first) is recorded.
* All IDs must be MongoDB ObjectIDs.
* Use Postman or curl for testing the API endpoints.

---

## 🧪 Future Improvements

* Add pagination & filtering
* Input validation with express-validator
* Swagger/OpenAPI documentation
* Admin dashboard (UI)

---

## 📜 License

This project is provided as part of a course assignment. Not intended for production use.

---

**Ghayth Moustapha**
Master in Web Sciences
Syrian Virtual University
2025

```

---

Let me know if you'd like a `Postman` collection or Swagger docs included as well.
```
