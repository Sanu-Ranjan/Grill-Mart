const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Cart, Wishlist } = require("../models/models.index");
const { err, failure, ok, success } = require("../utils/response");

const SALT_ROUNDS = 10;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

const signToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

// never send the password hash back
const toPublicUser = ({ _id, name, email, phone }) => ({
  _id,
  name,
  email,
  phone,
});

const findByEmail = async (email, withPassword = false) => {
  try {
    const query = User.findOne({ email: email.toLowerCase().trim() });
    const data = withPassword ? await query.select("+password") : await query;
    return ok(data);
  } catch (error) {
    return err(error);
  }
};

const findById = async (id) => {
  try {
    const data = await User.findById(id);
    return ok(data);
  } catch (error) {
    return err(error);
  }
};

const createUser = async ({ name, email, phone, password }) => {
  try {
    const hashed = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await User.create({ name, email, phone, password: hashed });

    // every user gets their own empty cart and wishlist
    await Cart.create({ user: user._id, items: [] });
    await Wishlist.create({ user: user._id, items: [] });

    return ok(user);
  } catch (error) {
    return err(error);
  }
};

const signup = async (req, res) => {
  const { name, email, phone, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json(failure("Name, email and password are required"));
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json(failure("Password must be at least 6 characters"));
  }

  try {
    const existing = await findByEmail(email);
    if (existing.error) {
      console.log("Error checking user", existing.error);
      return res
        .status(500)
        .json(failure("Internal server error : database operation failed"));
    }
    if (existing.data) {
      return res.status(409).json(failure("Email already registered"));
    }

    const { data: user, error } = await createUser({
      name,
      email,
      phone,
      password,
    });
    if (error) {
      console.log("Error creating user", error);
      return res
        .status(500)
        .json(failure("Internal server error : database operation failed"));
    }

    const token = signToken(user._id);
    res
      .status(201)
      .json(success({ token, user: toPublicUser(user) }, "Signup successful"));
  } catch (error) {
    console.log("Error at controller: signup", error);
    res.status(500).json(failure("Internal server error"));
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json(failure("Email and password are required"));
  }

  try {
    const { data: user, error } = await findByEmail(email, true);
    if (error) {
      console.log("Error finding user", error);
      return res
        .status(500)
        .json(failure("Internal server error : database operation failed"));
    }

    // same message for both cases so we don't reveal which emails exist
    if (!user) {
      return res.status(401).json(failure("Invalid email or password"));
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json(failure("Invalid email or password"));
    }

    const token = signToken(user._id);
    res
      .status(200)
      .json(success({ token, user: toPublicUser(user) }, "Login successful"));
  } catch (error) {
    console.log("Error at controller: login", error);
    res.status(500).json(failure("Internal server error"));
  }
};

const me = async (req, res) => {
  try {
    const { data: user, error } = await findById(req.user.id);
    if (error) {
      console.log("Error fetching user", error);
      return res
        .status(500)
        .json(failure("Internal server error : database operation failed"));
    }
    if (!user) {
      return res.status(401).json(failure("Unauthorized : user not found"));
    }
    res.status(200).json(success({ user: toPublicUser(user) }, "User fetched"));
  } catch (error) {
    console.log("Error at controller: me", error);
    res.status(500).json(failure("Internal server error"));
  }
};

module.exports = {
  signup,
  login,
  me,
};
