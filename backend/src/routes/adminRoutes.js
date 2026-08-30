const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
  getAllUsers,
  getAllTransactions,
} = require("../controllers/adminController");

router.get(
  "/users",
  authMiddleware,
  adminMiddleware,
  getAllUsers
);

router.get(
  "/transactions",
  authMiddleware,
  adminMiddleware,
  getAllTransactions
);

module.exports = router;