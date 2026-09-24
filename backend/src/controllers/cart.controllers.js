const { Cart } = require("../models/models.index");

const { err, failure, ok, success } = require("../utils/response");

const cart = async (userId) => {
  try {
    const data = await Cart.findOne({ user: userId }).populate("items.product");
    return ok(data);
  } catch (error) {
    return err(error);
  }
};

const update = async (userId, updatedItems) => {
  try {
    const updated = await Cart.findOneAndUpdate(
      { user: userId },
      { $set: { items: updatedItems } },
      { returnDocument: "after" },
    );
    return ok(updated);
  } catch (error) {
    return err(error);
  }
};

const getCart = async (req, res) => {
  try {
    const { data, error } = await cart(req.user.id);
    if (error) {
      console.log("Error fetching cart", error);
      return res
        .status(500)
        .json(failure("Internal server error : database operation failed"));
    }
    if (!data) {
      return res.status(404).json(failure("Cart not found"));
    }
    res.status(200).json(success({ cart: data }, "Cart fetched"));
  } catch (error) {
    console.log("Error at controller: getCart ", error);
    res.status(500).json(failure("Internal server error"));
  }
};

const updateCart = async (req, res) => {
  const { items } = req.body;

  if (!Array.isArray(items)) {
    return res.status(400).json(failure("items must be an array"));
  }

  try {
    const { data, error } = await update(req.user.id, items);
    if (error) {
      console.log("Error updating cart", error);
      return res
        .status(500)
        .json(failure("Internal server error : database operation failed"));
    }
    if (!data) {
      return res.status(404).json(failure("Cart not found"));
    }
    res.status(200).json(success({ cart: data }, "Cart updated"));
  } catch (error) {
    console.log("Error at controller: updateCart", error);
    res.status(500).json(failure("Internal server error"));
  }
};

module.exports = {
  updateCart,
  getCart,
};
