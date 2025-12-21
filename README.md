# Online Book Store – Full Stack Project

A full stack **Online Book Store** application built with:

- **Backend**: Java, Spring Boot, Spring Data JPA, Maven
- **Frontend**: React + Vite, Tailwind-style utility classes
- **Database**: Relational DB (e.g. MySQL/PostgreSQL) configured via Spring Boot

Customers can browse books, view detailed information, add items to cart, go through a simple payment step, place orders, and stock is automatically updated.

---

## 1. Project Structure

- **backend/** – Spring Boot application
  - `src/main/java/com/onlineBookStore/...`
    - `controller/` – REST APIs (`AuthController`, `BookController`, `OrderController`)
    - `entity/` – JPA entities (`Book`, `User`, `Order`, `OrderItem`)
    - `repository/` – Spring Data repositories
    - `service/` – Services (e.g. `BookService`)
  - `src/main/resources/application.properties` – DB & server configuration
- **frontend/** – React + Vite SPA
  - `src/pages/` – Main pages (`Home`, `Books`, `BookDetails`, `Cart`, `Login`, `Register`, `Admin`)
  - `src/components/` – UI components (`Navbar`, `Footer`, `BookCard`, etc.)
  - `src/context/` – `AuthContext`, `CartContext`
  - `src/services/API.js` – Axios instance pointing to backend URL

---

## 2. Prerequisites

Make sure these are installed:

- **Java 17+** (or compatible with your Spring Boot version)
- **Maven 3+** (or use the included `mvnw` / `mvnw.cmd`)
- **Node.js 18+**
- **npm** (comes with Node)
- A running **database** (e.g. MySQL/PostgreSQL) if you are not using in‑memory DB

---

## 3. Backend – Setup & Run

### 3.1 Configure database

Edit `backend/src/main/resources/application.properties` and set your DB connection (example for MySQL):

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/online_book_store
spring.datasource.username=your_db_user
spring.datasource.password=your_db_password

spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

Adjust URL, username, and password to match your environment.

### 3.2 Install dependencies & run backend

From the **project root**:

```bash
cd backend

# Option 1: using Maven installed on your system
mvn spring-boot:run

# Option 2: using Maven wrapper (no global Maven needed)
./mvnw spring-boot:run      # Linux / macOS
mvnw.cmd spring-boot:run    # Windows
```

The backend will start on `http://localhost:8080` by default.

Main API endpoints:

- `GET /books` – list all books
- `GET /books/{id}` – book details (includes description, stock, etc.)
- `POST /books` – create book (used by admin)
- `POST /orders` – place order; reduces stock for purchased books

---

## 4. Frontend – Setup & Run

### 4.1 Configure API base URL

Check `frontend/src/services/API.js`:

```js
import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080", // change this when you deploy backend
});
```

If you deploy the backend, update `baseURL` to your deployed backend URL (for example `https://your-backend.onrender.com`).

### 4.2 Install dependencies

From the **project root**:

```bash
cd frontend
npm install
```

### 4.3 Run the frontend dev server

```bash
cd frontend
npm run dev
```

By default Vite runs on `http://localhost:5173` (or another port if 5173 is taken).

Make sure the backend (`:8080`) is running so the frontend can call the APIs.

---

## 5. Key Features

- **Authentication**
  - Login and registration pages (`Login`, `Register`) backed by `AuthController`.
  - `AuthContext` keeps the logged‑in user in the frontend.

- **Books**
  - `/books` page lists all books with search, sorting, and category filter.
  - Each book card shows title, author, price, category, stock status.
  - Clicking a book opens `/books/:id` (**BookDetails** page):
    - Shows full information, including **description** from DB.
    - Shows current stock: “In Stock (X)” or “Out of Stock”.
    - Add to Cart button (disabled if out of stock).

- **Cart & Orders**
  - `CartContext` manages items in cart.
  - `/cart` page:
    - Quantity controls, remove items, clear cart.
    - Order summary with total.
    - **Place Order** opens a payment modal:
      - Payment methods: Card / UPI / COD.
      - For cards: card number (16 digits), expiry (MM/YYYY), CVV (3 digits), validation on frontend.
    - On confirmation, frontend calls `POST /orders`:
      - Backend validates stock.
      - Stock is reduced in the database.
      - If insufficient stock, backend throws an error.

- **Stock handling**
  - `Book` has `stock` and `description` fields in the DB.
  - Every time an order is placed, stock is decreased.
  - When stock hits 0, UI shows “Out of Stock” and disables adding to cart.

---

## 6. Deployment Notes

- **Frontend (React/Vite)** can be deployed to:
  - Netlify, Vercel, GitHub Pages, etc.
  - Build command: `npm run build`
  - Output / publish directory: `dist`

- **Backend (Spring Boot)** should be deployed to a server or platform such as:
  - Render, Railway, Heroku‑like platforms, AWS, etc.
  - Make sure it has access to your production database (cloud MySQL/PostgreSQL).

- After backend deployment:
  - Update `frontend/src/services/API.js` `baseURL` to your backend’s public URL.
  - Rebuild and redeploy the frontend.

Then anyone visiting the frontend URL (e.g. Netlify) will interact with your **real backend and database**.

---

## 7. Running Tests (optional)

Backend:

```bash
cd backend
mvn test
```

Frontend (if you add tests later):

```bash
cd frontend
npm test   # or your chosen test command
```

---

## 8. Future Improvements

- Add proper authentication with JWT and role‑based access (user/admin).
- Add pagination and more filters on the books list.
- Integrate a real payment gateway instead of the demo payment modal.
- Add user order history page.


