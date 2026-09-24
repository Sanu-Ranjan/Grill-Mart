const router = require("express").Router();

const { getCart, updateCart } = require("../controllers/cart.controllers");

router.get("/", getCart);

router.put("/", updateCart);

module.exports = {
  router,
};
