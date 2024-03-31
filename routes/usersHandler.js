const express = require("express");
const {
  registerUser,
  getCurrentUser,
  loginUser,
} = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", validateToken, getCurrentUser);

module.exports = router;
