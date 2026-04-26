const router = require("express").Router();

const {
  getAddresses,
  getAddress,
  addAddress,
  deleteAddress,
  updateAddressById,
} = require("../controllers/address.controller");

router.get("/", getAddresses);
router.get("/id/:id", getAddress);
router.post("/", addAddress);
router.delete("/:id", deleteAddress);
router.put("/:id", updateAddressById);

module.exports = { router };
