const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// Gjeneron IBAN demo unik për projektin
const generateIBAN = () => {
  const randomDigits = Array.from(
    { length: 16 },
    () => crypto.randomInt(0, 10)
  ).join("");

  return `XK05${randomDigits}`;
};

// ==============================
// REGISTER
// ==============================
const register = (req, res) => {
  const {
    full_name,
    email,
    password,
    phone
  } = req.body;

  if (!full_name || !email || !password) {
    return res.status(400).json({
      message: "Full name, email and password are required",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: "Password must be at least 6 characters",
    });
  }

  // Kontrollo nëse email ekziston
  db.query(
    "SELECT id FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        return res.status(500).json({
          message: "Database error",
        });
      }

      if (results.length > 0) {
        return res.status(400).json({
          message: "Email already exists",
        });
      }

      try {
        const passwordHash = await bcrypt.hash(
          password,
          10
        );

        // Fillon transaction në MySQL
        db.beginTransaction((err) => {
          if (err) {
            return res.status(500).json({
              message: "Could not start registration",
            });
          }

          // Krijo user-in
          db.query(
            `INSERT INTO users
            (
              full_name,
              email,
              password_hash,
              phone
            )
            VALUES (?, ?, ?, ?)`,
            [
              full_name,
              email,
              passwordHash,
              phone || null,
            ],
            (err, userResult) => {
              if (err) {
                return db.rollback(() => {
                  res.status(500).json({
                    message: "Could not create user",
                  });
                });
              }

              const userId = userResult.insertId;

              // Gjenero IBAN automatik
              const iban = generateIBAN();

              // Krijo Current Account për user-in
              db.query(
                `INSERT INTO accounts
                (
                  user_id,
                  iban,
                  balance,
                  currency,
                  account_type,
                  status
                )
                VALUES (?, ?, ?, ?, ?, ?)`,
                [
                  userId,
                  iban,
                  0.00,
                  "EUR",
                  "Current Account",
                  "active",
                ],
                (err) => {
                  if (err) {
                    return db.rollback(() => {
                      res.status(500).json({
                        message:
                          "User account could not be created",
                      });
                    });
                  }

                  db.commit((err) => {
                    if (err) {
                      return db.rollback(() => {
                        res.status(500).json({
                          message:
                            "Registration could not be completed",
                        });
                      });
                    }

                    return res.status(201).json({
                      message:
                        "User registered successfully",
                      userId,
                      account: {
                        iban,
                        balance: 0,
                        currency: "EUR",
                        account_type:
                          "Current Account",
                      },
                    });
                  });
                }
              );
            }
          );
        });
      } catch (error) {
        return res.status(500).json({
          message: "Server error",
        });
      }
    }
  );
};

// ==============================
// LOGIN
// ==============================
const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        return res.status(500).json({
          message: "Database error",
        });
      }

      if (results.length === 0) {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }

      const user = results[0];

      try {
        const passwordMatch = await bcrypt.compare(
          password,
          user.password_hash
        );

        if (!passwordMatch) {
          return res.status(401).json({
            message: "Invalid email or password",
          });
        }

        const token = jwt.sign(
          {
            id: user.id,
            role: user.role,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d",
          }
        );

        return res.status(200).json({
          message: "Login successful",

          token,

          user: {
            id: user.id,
            full_name: user.full_name,
            email: user.email,
            role: user.role,
            phone: user.phone,
          },
        });
      } catch (error) {
        return res.status(500).json({
          message: "Server error",
        });
      }
    }
  );
};

module.exports = {
  register,
  login,
};