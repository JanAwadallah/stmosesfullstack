const express = require("express");
const router = express.Router();
const { bookLiturgy } = require("../controllers/liturgyController");

router.post("/", bookLiturgy);

module.exports = router;
