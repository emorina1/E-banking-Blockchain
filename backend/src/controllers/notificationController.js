const db = require("../config/db");

const getMyNotifications = (req, res) => {
  const userId = req.user.id;

  db.query(
    `SELECT
      id,
      title,
      message,
      is_read,
      created_at
     FROM notifications
     WHERE user_id = ?
     ORDER BY created_at DESC`,
    [userId],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          message: "Database error",
        });
      }

      return res.status(200).json({
        notifications: results,
      });
    }
  );
};

module.exports = {
  getMyNotifications,
};