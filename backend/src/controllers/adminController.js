const db = require("../config/db");

const getAllUsers = (req, res) => {
  db.query(
    `SELECT 
      id,
      full_name,
      email,
      role,
      phone,
      created_at
     FROM users
     ORDER BY created_at DESC`,
    (err, results) => {
      if (err) {
        return res.status(500).json({
          message: "Database error",
        });
      }

      return res.status(200).json({
        users: results,
      });
    }
  );
};

const getAllTransactions = (req, res) => {
  db.query(
    `SELECT
      id,
      sender_account_id,
      recipient_iban,
      amount,
      description,
      status,
      transaction_hash,
      created_at
     FROM transactions
     ORDER BY created_at DESC`,
    (err, results) => {
      if (err) {
        return res.status(500).json({
          message: "Database error",
        });
      }

      return res.status(200).json({
        transactions: results,
      });
    }
  );
};

module.exports = {
  getAllUsers,
  getAllTransactions,
};