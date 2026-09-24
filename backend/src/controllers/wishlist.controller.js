const { Wishlist } = require("../models/models.index");
const { err, failure, ok, success } = require("../utils/response");

const wishlist = async (userId) => {
  try {
    const data = await Wishlist.findOne({ user: userId }).populate("items");
    return ok(data);
  } catch (error) {
    return err(error);
  }
};

const addItem = async (userId, productId) => {
  try {
    const updated = await Wishlist.findOneAndUpdate(
      { user: userId },
      { $addToSet: { items: productId } },
      { returnDocument: "after" },
    );
    return ok(updated);
  } catch (error) {
    return err(error);
  }
};

const removeItem = async (userId, productId) => {
  try {
    const updated = await Wishlist.findOneAndUpdate(
      { user: userId },
      { $pull: { items: productId } },
      { returnDocument: "after" },
    );
    return ok(updated);
  } catch (error) {
    return err(error);
  }
};

const getWishlist = async (req, res) => {
  try {
    const { data, error } = await wishlist(req.user.id);
    if (error) {
      console.log("Error fetching wishlist", error);
      return res
        .status(500)
        .json(failure("Internal server error : database operation failed"));
    }
    if (!data) {
      return res.status(404).json(failure("Wishlist not found"));
    }
    res.status(200).json(success({ wishlist: data }, "Wishlist fetched"));
  } catch (error) {
    console.log("Error at controller: getWishlist", error);
    res.status(500).json(failure("Internal server error"));
  }
};

const addWishlistItem = async (req, res) => {
  const { productId } = req.body;
  if (!productId) {
    return res.status(400).json(failure("productId is required"));
  }
  try {
    const { data, error } = await addItem(req.user.id, productId);
    if (error) {
      console.log("Error adding wishlist item", error);
      return res
        .status(500)
        .json(failure("Internal server error : database operation failed"));
    }
    if (!data) {
      return res.status(404).json(failure("Wishlist not found"));
    }
    res.status(200).json(success({ wishlist: data }, "Item added to wishlist"));
  } catch (error) {
    console.log("Error at controller: addWishlistItem", error);
    res.status(500).json(failure("Internal server error"));
  }
};

const deleteWishlistItem = async (req, res) => {
  const { productId } = req.body;
  if (!productId) {
    return res.status(400).json(failure("productId is required"));
  }
  try {
    const { data, error } = await removeItem(req.user.id, productId);
    if (error) {
      console.log("Error removing wishlist item", error);
      return res
        .status(500)
        .json(failure("Internal server error : database operation failed"));
    }
    if (!data) {
      return res.status(404).json(failure("Wishlist not found"));
    }
    res
      .status(200)
      .json(success({ wishlist: data }, "Item removed from wishlist"));
  } catch (error) {
    console.log("Error at controller: deleteWishlistItem", error);
    res.status(500).json(failure("Internal server error"));
  }
};

module.exports = {
  getWishlist,
  addWishlistItem,
  deleteWishlistItem,
};
