const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodeMailer = require("nodemailer");
const User = require("../models/users");

const existingUserErr = "This user has already been registered.";
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: "30d",
  });
};

const registerUser = async (req, res) => {
  const {
    username,
    password,
    email,
    firstName,
    lastName,
    phone,
    hireDate,
    active,
    salary,
  } = req.body;
  if (
    (!username,
    !password,
    !email,
    !firstName,
    !lastName,
    !phone,
    !hireDate,
    !salary)
  ) {
    res.status(400);
    throw new Error("Please, provide all the required information.");
  }
  const userExists = await User.findOne({ username });
  if (userExists) {
    res.status(400);
    throw new Error(existingUserErr);
  }
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    res.status(400);
    throw new Error(existingUserErr);
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    firstName,
    lastName,
    phone,
    hireDate,
    active,
    salary,
  });
  if (user) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      hireDate: user.hireDate,
      active: user.active,
      salary: user.salary,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("an error occurred, lol");
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && (await bcrypt.compare(password, user.password))) {
    const { password, ...userData } = user; // spread operator to include everthing else but the password in userData
    res.json({
      userData,
      token: generateToken(user._id),
    });
    console.log(userData);
  } else {
    res.status(403);
    throw new Error("Either your password or username is incorrect, lmao");
  }
};

module.exports = {
  registerUser,
  loginUser
};
