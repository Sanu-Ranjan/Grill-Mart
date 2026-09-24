# GrillMart

A full-stack e-commerce platform for baking, grilling, and tandoor equipment. Built to demonstrate JWT authentication, per-user cart and wishlist state management, address management, order placement, and self-hosted VPS deployment.

---

## Demo Link

[Live Demo](https://shop.devranjan.cloud/)

---

## Demo Video

Watch a walkthrough of all major features:

[Video Link](https://drive.google.com/file/d/1UUCCsolSq9IqObdgztknIfkHZnciO3RD/view?usp=sharing)

---

## Quick Start

```bash
# Clone the repo
git clone https://github.com/Sanu-Ranjan/Grill-Mart.git
cd Grill-Mart
 
# Backend
cd backend
cp .env.example .env      # fill in MONGODB, ALLOWED_ORIGINS, OPENAI_API_KEY, JWT_SECRET
npm install
npm start                 # starts on http://localhost:3000
 
# Frontend
cd ../client/ecom-project
cp .env.example .env      # set VITE_BACKEND
npm install
npm run dev                # starts on http://localhost:5173
```

---

## Tech Stack

- **Frontend:** React 19, React Router 7, Bootstrap 5, Bootstrap Icons, react-hook-form, react-toastify
- **Backend:** Node.js, Express 5, Mongoose 9, JWT (jsonwebtoken), bcrypt
- **Database:** MongoDB (self-hosted on VPS)
- **Infrastructure:** Hostinger VPS (Ubuntu LTS), Nginx, PM2, Let's Encrypt via Certbot
- **CI/CD:** GitHub Actions — auto-deploys on push to `main`

---

## Documentation

- [App Features](./docs/features.md)
- [API Reference](./docs/apiInfo.md)
- [Database Models](./docs/models.md)

---

## Design Decisions

- **Server-side price recalculation on order placement** — the order controller looks up each product's real price from the database rather than trusting the price sent by the client, preventing price tampering
- **Free delivery threshold** — orders over ₹999 get free delivery, calculated on the backend at order time, not just displayed on the frontend
- **JWT auth via `Authorization` header** — frontend and backend live on different domains, so a cookie would be third-party and blocked by browsers. The token is kept in localStorage and sent as a Bearer header instead
- **Browse freely, login to buy** — products and search are public; cart, wishlist, addresses, orders and profile require login. Protected actions redirect to login and return the user to where they were
- **Ownership enforced on the server** — cart, wishlist, address and order queries are always scoped to the user from the token, never to ids sent by the client, so one user can never read or edit another user's data
- **`useBusyState` hook** — tracks a local busy flag independent of the global loading state, preventing duplicate clicks while a specific row's action is in flight
- **Response helpers (`ok`/`err`, `success`/`failure`)** — every controller follows the same two-layer pattern: a data-layer function returns `{ data, error }`, and the route handler wraps that into a consistent `{ success, message, data }` JSON response

---

## Known Limitations

- Token stored in localStorage is readable by JavaScript, so an XSS bug could leak it (an httpOnly cookie on a shared domain would avoid this)
- Product and category create routes are not admin-protected yet
- No pagination on `GET /products` — would be needed at scale
- No payment integration — checkout creates an order record but does not process real payment

---

## Contact

For bugs or feature requests, reach out at [ranjan.code33@gmail.com]()
