const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  getMyAccounts,
} = require("../controllers/accountController");

router.get("/", authMiddleware, getMyAccounts);

module.exports = router;