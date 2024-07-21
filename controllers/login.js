const bcrycpt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

module.exports = async (req, res) => {
  const { email, password } = req.body;
  const dbUser = await User.findOne({ email }).exec();
  if (dbUser) {
    const matchPassword = await bcrycpt.compare(password, dbUser.password);
    if (matchPassword) {
      const jwtToken = jwt.sign(
        {
          _id: dbUser.id,
          name: dbUser.name,
          email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      res.json({
        message: "Login Successfull",
        user: {
          _id: dbUser.id,
          name: dbUser.name,
          email: dbUser.email,
          imageId: dbUser.imageId,
          userType: dbUser.userType,
        },
        jwtToken,
      });
    } else {
      res.status(400).json({ message: "Username or Password is incorrect" });
      return false;
    }
  } else {
    res.status(400).json({ message: "Email does not exists, Signup first" });
    return false;
  }
};
