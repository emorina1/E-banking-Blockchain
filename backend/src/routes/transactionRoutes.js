const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createTransfer,
  verifyTransaction,
  getMyTransactions,
} = require("../controllers/transactionController");

router.post("/transfer", authMiddleware, createTransfer);

router.get(
  "/verify/:id",
  authMiddleware,
  verifyTransaction
);

router.get(
  "/",
  authMiddleware,
  getMyTransactions
);

module.exports = router;