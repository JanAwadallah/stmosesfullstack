const express = require("express");
const router = express.Router();
const {
  registerUser,
  userLogin,
  getMe,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.post("/login", userLogin);
router.get("/me", protect, getMe);

module.exports = router;
