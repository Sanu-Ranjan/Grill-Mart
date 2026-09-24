const express = require("express");
const cors = require("cors");

const category = require("./routes/categories.router");
const product = require("./routes/product.router");
const cart = require("./routes/cart.routes");
const wishlist = require("./routes/wishlist.routes");
const address = require("./routes/address.routes");
const order = require("./routes/order.routes");
const ai = require("./routes/ai.routes");
const auth = require("./routes/auth.routes");
const { verifyToken } = require("./middleware/auth.middleware");

const app = express();

app.use(express.json());

const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS;
if (!ALLOWED_ORIGINS) {
  console.log("Error : allowed ORIGIN not set");
  process.exit(1);
}

if (!process.env.JWT_SECRET) {
  console.log("Error : JWT_SECRET not set");
  process.exit(1);
}

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];

app.use(
  cors({
    origin: allowedOrigins,
  }),
);

// public routes
app.use("/api/v1/auth", auth.router);
app.use("/api/v1/categories", category.router);
app.use("/api/v1/products", product.router);
app.use("/api/v1/ai", ai.router);

// protected routes: every request needs a valid token
app.use("/api/v1/cart", verifyToken, cart.router);
app.use("/api/v1/wishlist", verifyToken, wishlist.router);
app.use("/api/v1/address", verifyToken, address.router);
app.use("/api/v1/orders", verifyToken, order.router);

module.exports = {
  app,
};
