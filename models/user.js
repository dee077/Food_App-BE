const mongoose = require("mongoose");
const validator = require("validator");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a name"],
  },
  email: {
    type: String,
    required: [true, "Please enter email"],
    unique: true,
    validate: [isEmail, "Please enter valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
    minLength: [6, "Minimum password lenght required is 6"],
  },
  profileUrl: {
    type: String,
    default: "https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png",
  },
  userType: {
    type: String,
    enum: ["User", "Admin"],
    default: "User",
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
