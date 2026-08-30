const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getMyNotifications,
} = require("../controllers/notificationController");

router.get("/", authMiddleware, getMyNotifications);

module.exports = router;