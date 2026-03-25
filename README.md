# NC News — Backend API

A RESTful news API built with **Node.js**, **Express**, and **PostgreSQL**, developed during the Northcoders Full-Stack bootcamp using Test-Driven Development throughout.

Supports articles, comments, topics, and users — with filtering, sorting, and pagination on key endpoints.

---

## 🔗 Links

- **Live API:** [nc-news-vvdv.onrender.com/api](https://nc-news-vvdv.onrender.com/api)
- **Frontend:** [nc-news-sultan.netlify.app](https://nc-news-sultan.netlify.app/)
- **Frontend Repo:** [github.com/Sultan0013/NC-news-FE](https://github.com/Sultan0013/NC-news-FE)

> ⚠️ Hosted on Render's free tier — may take 30–60 seconds to wake on first request.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | PostgreSQL |
| ORM/Query | pg (node-postgres) |
| Testing | Jest + Supertest |

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api` | List all available endpoints |
| GET | `/api/topics` | Get all topics |
| GET | `/api/articles` | Get all articles (supports `sort_by`, `order`, `topic`, `limit`, `p`) |
| GET | `/api/articles/:id` | Get article by ID |
| GET | `/api/articles/:id/comments` | Get comments for an article |
| POST | `/api/articles/:id/comments` | Post a comment |
| PATCH | `/api/articles/:id` | Update article votes |
| DELETE | `/api/comments/:id` | Delete a comment |
| GET | `/api/users` | Get all users |
| GET | `/api/users/:username` | Get user by username |

---

## ⚙️ Local Setup

### 1. Clone the repo
```bash
git clone https://github.com/AOYousufi/NC-News-BE.git
cd NC-News-BE
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create environment files

Create two files at the project root:

**.env.development**
```
PGDATABASE=nc_news
```

**.env.test**
```
PGDATABASE=nc_news_test
```

> These files are gitignored — never commit them.

### 4. Set up and seed the database
```bash
npm run setup-dbs
npm run seed
```

### 5. Run tests
```bash
npm run app-test
```

---

## 🧪 Testing

All endpoints are covered by integration tests using **Jest** and **Supertest**. Tests run against a separate test database and reseed before each test suite to ensure isolation.

---

## Requirements

- Node.js `v18+`
- PostgreSQL `v14+`

---

*Built as part of the Northcoders Digital Skills Bootcamp in Software Engineering.*
