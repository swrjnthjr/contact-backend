const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

//@desc Get all contacts
//@route POST /api/user/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory.");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("user already registered.");
  }

  // hash password
  const hashPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    userName,
    email,
    password: hashPassword,
  });
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }

  res.status(200).json({ message: "Register user!", user });
});

//@desc Get all contacts
//@route get /api/user/login
//@access private
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory.");
  }
  const user = await User.findOne({ email });
  //compare password
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.name,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("username or password is invalid!");
  }
});

//@desc Get all contacts
//@route GET /api/user/current
//@access private
const getCurrentUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

module.exports = {
  registerUser,
  getCurrentUser,
  loginUser,
};
