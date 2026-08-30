const db = require("../config/db");
const crypto = require("crypto");

// ==============================
// CREATE TRANSFER
// ==============================
const createTransfer = (req, res) => {
  const userId = req.user.id;
  const { recipient_iban, amount, description } = req.body;

  if (!recipient_iban || !amount || Number(amount) <= 0) {
    return res.status(400).json({
      message: "Recipient IBAN and a valid amount are required",
    });
  }

  const transferAmount = Number(amount);
  const cleanRecipientIban = recipient_iban.replace(/\s/g, "");

  db.beginTransaction((err) => {
    if (err) {
      return res.status(500).json({
        message: "Could not start transaction",
      });
    }

    // 1. Gjej account-in e dërguesit
    db.query(
      `SELECT *
       FROM accounts
       WHERE user_id = ?
       AND status = 'active'
       LIMIT 1
       FOR UPDATE`,
      [userId],
      (err, senderResults) => {
        if (err) {
          return db.rollback(() => {
            res.status(500).json({
              message: "Database error",
            });
          });
        }

        if (senderResults.length === 0) {
          return db.rollback(() => {
            res.status(404).json({
              message: "Sender account not found",
            });
          });
        }

        const senderAccount = senderResults[0];

        // Mos lejo transfer në account-in e vet
        if (senderAccount.iban === cleanRecipientIban) {
          return db.rollback(() => {
            res.status(400).json({
              message: "You cannot transfer money to your own account",
            });
          });
        }

        // Kontrollo balance
        if (Number(senderAccount.balance) < transferAmount) {
          return db.rollback(() => {
            res.status(400).json({
              message: "Insufficient balance",
            });
          });
        }

        // 2. Gjej account-in e marrësit
        db.query(
          `SELECT *
           FROM accounts
           WHERE iban = ?
           AND status = 'active'
           LIMIT 1
           FOR UPDATE`,
          [cleanRecipientIban],
          (err, receiverResults) => {
            if (err) {
              return db.rollback(() => {
                res.status(500).json({
                  message: "Database error",
                });
              });
            }

            if (receiverResults.length === 0) {
              return db.rollback(() => {
                res.status(404).json({
                  message: "Recipient account not found",
                });
              });
            }

            const receiverAccount = receiverResults[0];

            // 3. Merr emrin e dërguesit
            db.query(
              `SELECT full_name
               FROM users
               WHERE id = ?
               LIMIT 1`,
              [userId],
              (err, senderUserResults) => {
                if (err) {
                  return db.rollback(() => {
                    res.status(500).json({
                      message: "Failed to get sender information",
                    });
                  });
                }

                const senderName =
                  senderUserResults.length > 0
                    ? senderUserResults[0].full_name
                    : "Unknown User";

                // ==============================
                // SHA-256 HASH
                // ==============================
                const hashData =
                  senderAccount.id +
                  "|" +
                  cleanRecipientIban +
                  "|" +
                  transferAmount +
                  "|" +
                  (description || "");

                const transactionHash = crypto
                  .createHash("sha256")
                  .update(hashData)
                  .digest("hex");

                // 4. Zbrite shumën nga dërguesi
                db.query(
                  `UPDATE accounts
                   SET balance = balance - ?
                   WHERE id = ?`,
                  [transferAmount, senderAccount.id],
                  (err) => {
                    if (err) {
                      return db.rollback(() => {
                        res.status(500).json({
                          message: "Failed to update sender balance",
                        });
                      });
                    }

                    // 5. Shtoje shumën te marrësi
                    db.query(
                      `UPDATE accounts
                       SET balance = balance + ?
                       WHERE id = ?`,
                      [transferAmount, receiverAccount.id],
                      (err) => {
                        if (err) {
                          return db.rollback(() => {
                            res.status(500).json({
                              message: "Failed to update recipient balance",
                            });
                          });
                        }

                        // 6. Ruaje transaction
                        db.query(
                          `INSERT INTO transactions
                          (
                            sender_account_id,
                            receiver_account_id,
                            recipient_iban,
                            amount,
                            description,
                            status,
                            transaction_hash
                          )
                          VALUES (?, ?, ?, ?, ?, ?, ?)`,
                          [
                            senderAccount.id,
                            receiverAccount.id,
                            cleanRecipientIban,
                            transferAmount,
                            description || null,
                            "completed",
                            transactionHash,
                          ],
                          (err, result) => {
                            if (err) {
                              return db.rollback(() => {
                                res.status(500).json({
                                  message: "Failed to save transaction",
                                });
                              });
                            }

                            // 7. Notification për dërguesin
                            db.query(
                              `INSERT INTO notifications
                              (
                                user_id,
                                title,
                                message
                              )
                              VALUES (?, ?, ?)`,
                              [
                                userId,
                                "Transfer Completed",
                                `Your transfer of €${transferAmount.toFixed(
                                  2
                                )} was completed successfully.`,
                              ],
                              (err) => {
                                if (err) {
                                  return db.rollback(() => {
                                    res.status(500).json({
                                      message:
                                        "Failed to create sender notification",
                                    });
                                  });
                                }

                                // 8. Notification për marrësin
                                db.query(
                                  `INSERT INTO notifications
                                  (
                                    user_id,
                                    title,
                                    message
                                  )
                                  VALUES (?, ?, ?)`,
                                  [
                                    receiverAccount.user_id,
                                    "Money Received",
                                    `You received €${transferAmount.toFixed(
                                      2
                                    )} from ${senderName}.`,
                                  ],
                                  (err) => {
                                    if (err) {
                                      return db.rollback(() => {
                                        res.status(500).json({
                                          message:
                                            "Failed to create recipient notification",
                                        });
                                      });
                                    }

                                    // 9. Commit
                                    db.commit((err) => {
                                      if (err) {
                                        return db.rollback(() => {
                                          res.status(500).json({
                                            message:
                                              "Transfer could not be completed",
                                          });
                                        });
                                      }

                                      return res.status(201).json({
                                        message:
                                          "Transfer completed successfully",
                                        transactionId: result.insertId,
                                        amount: transferAmount,
                                        recipient_iban:
                                          cleanRecipientIban,
                                        transaction_hash:
                                          transactionHash,
                                      });
                                    });
                                  }
                                );
                              }
                            );
                          }
                        );
                      }
                    );
                  }
                );
              }
            );
          }
        );
      }
    );
  });
};

// ==============================
// VERIFY TRANSACTION HASH
// ==============================
const verifyTransaction = (req, res) => {
  const transactionId = req.params.id;

  db.query(
    "SELECT * FROM transactions WHERE id = ?",
    [transactionId],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          message: "Database error",
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          message: "Transaction not found",
        });
      }

      const transaction = results[0];

      const hashData =
        transaction.sender_account_id +
        "|" +
        transaction.recipient_iban +
        "|" +
        Number(transaction.amount) +
        "|" +
        (transaction.description || "");

      const calculatedHash = crypto
        .createHash("sha256")
        .update(hashData)
        .digest("hex");

      const isValid =
        calculatedHash === transaction.transaction_hash;

      return res.status(200).json({
        transactionId: transaction.id,
        valid: isValid,

        message: isValid
          ? "Transaction integrity verified successfully"
          : "Transaction data may have been modified",

        storedHash: transaction.transaction_hash,
        calculatedHash,
      });
    }
  );
};

// ==============================
// GET USER TRANSACTIONS
// ==============================
const getMyTransactions = (req, res) => {
  const userId = req.user.id;

  db.query(
    `SELECT
      t.id,
      t.sender_account_id,
      t.receiver_account_id,
      t.recipient_iban,
      t.amount,
      t.description,
      t.status,
      t.transaction_hash,
      t.created_at,

      CASE
        WHEN sender.user_id = ? THEN 'sent'
        WHEN receiver.user_id = ? THEN 'received'
      END AS transaction_type

    FROM transactions t

    LEFT JOIN accounts sender
      ON t.sender_account_id = sender.id

    LEFT JOIN accounts receiver
      ON t.receiver_account_id = receiver.id

    WHERE
      sender.user_id = ?
      OR receiver.user_id = ?

    ORDER BY t.created_at DESC`,
    [userId, userId, userId, userId],
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
  createTransfer,
  verifyTransaction,
  getMyTransactions,
};