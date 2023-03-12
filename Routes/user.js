const express = require("express");
const router = express.Router();

const {registerUser, loginUser} = require("../Controllers/user");
const asyncError = require("../middleware/asyncErrors");

router.post("/register", asyncError(registerUser));
router.post("/login", asyncError(loginUser));

module.exports = router;

