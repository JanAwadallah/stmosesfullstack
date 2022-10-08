const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

//@desc     Register a new user
//@route    /api/users
//@access   Public

const registerUser = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    dateOfBirth,
    email,
    geelongLocal,
    password,
    family,
  } = req.body;
  if (!firstName || !lastName || !dateOfBirth || !email || !password) {
    res.status(400);
    throw new Error("Please include all fields");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("This email address already registered, Please login");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    firstName,
    lastName,
    dateOfBirth,
    email,
    geelongLocal,
    family,
    password: hashedPassword,
  });
  if (user) {
    res.header("Access-Control-Allow-Origin", "*");
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid user details");
  }
});

//@desc     Login user
//@route    /api/users/login
//@access   Private
const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.family.phone,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid login details");
  }
});

//@desc     Register a new user
//@route    /api/users
//@access   Public
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    id: req.user._id,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    email: req.user.email,
  });
});
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SEC, {
    expiresIn: "10d",
  });
};

module.exports = {
  registerUser,
  userLogin,
  getMe,
};
