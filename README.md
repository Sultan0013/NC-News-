# 📰 NC News BackEnd

Welcome to the **NC News Backend**! 🎉 This is your one-stop-shop for all things related to news articles, comments, topics, and users. Developed with care and precision, this API is designed to handle all your news needs with a touch of flair!

## 🚀 Project Overview

This project is the backend powerhouse for a news application, created as part of the **Digital Skills Bootcamp in Software Engineering** by Northcoders. Built with **Express.js** and **PostgreSQL**, and guided by the principles of **Test-Driven Development (TDD)**, this API is robust, scalable, and ready for action! 💪

- **Live Front-End:** Check out the deployed front-end [here](https://nc-news-sultan.netlify.app/).

- **Front-End Repository:** Explore the front-end on [GitHub](https://github.com/Sultan0013/NC-news-FE), where you'll find full setup instructions for running it locally.

## 🌐 Hosted API

Our API is live and kicking on Render! You can explore all available endpoints here:

🔗 **[NC News API Endpoints](https://nc-news-vvdv.onrender.com/api)**

In case you need to give the API a little nudge (sometimes services need a quick refresh), you can trigger a redeployment here:

🔄 **[Trigger API Redeployment](https://api.render.com/deploy/srv-cqd8ggrv2p9s73ea1rc0?key=tMSCoQq8OfE)**

## 🛠️ Setup & Installation

Ready to dive in? Here’s how to get the API up and running on your local machine:

### 1. Clone the Repository 📂

```bash
git clone https://github.com/Sultan0013/NC-News-BE.git
cd NC-News-BE
```

### 2. Install Dependencies 📦

```bash
npm install
```

### 3. Setup Environment Variables 🛠️

Create two `.env` files at the root of the project:

- **`.env.development`:**

```makefile
PGDATABASE=nc_news
```

- **`.env.test`:**

```makefile
PGDATABASE=nc_news_test
```

### 4. Initialize the Databases 🗄️

Run the following commands to initialize and seed the databases:

```bash
npm run setup-dbs
npm run seed
```

### 5. Run the Tests ✅

Ensure everything is working perfectly by running the test suite:

```bash
npm run app-test
```

### 🧑‍💻 Contributing

We welcome contributions! Feel free to fork the repository and submit pull requests. Let’s make this project even better together! 💼

---

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)
