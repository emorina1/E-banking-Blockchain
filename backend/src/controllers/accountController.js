const db = require("../config/db");

const getMyAccounts = (req, res) => {
  const userId = req.user.id;

  db.query(
    `SELECT 
      id,
      iban,
      balance,
      currency,
      account_type,
      status,
      created_at
     FROM accounts
     WHERE user_id = ?`,
    [userId],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          message: "Database error",
        });
      }

      return res.status(200).json({
        accounts: results,
      });
    }
  );
};

module.exports = {
  getMyAccounts,
};