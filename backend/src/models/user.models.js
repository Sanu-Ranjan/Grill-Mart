const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: { type: String, trim: true },
    password: { type: String, required: true, select: false },
  },
  { timestamps: true },
);

// own collection name so it doesn't clash with other projects' "users" in the same DB
const User = model("User", userSchema, "grillMartUsers");

module.exports = {
  User,
};
