const crypto = require("crypto");
const db = require("../db");

function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

exports.signup = (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({
      error: "Full name, email and password are required.",
    });
  }

  const passwordHash = hashPassword(password);

  db.get(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, row) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          error: "Database error",
        });
      }

      if (row) {
        return res.status(409).json({
          error: "Email already exists.",
        });
      }

      db.run(
        "INSERT INTO users (username,email,password) VALUES (?,?,?)",
        [fullName, email, passwordHash],
        function (err) {
          if (err) {
            console.error(err);
            return res.status(500).json({
              error: "Signup failed",
            });
          }

          res.json({
            message: "Signup successful",
            user: {
              id: this.lastID,
              fullName,
              email,
            },
          });
        }
      );
    }
  );
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  const passwordHash = hashPassword(password);

  db.get(
    "SELECT * FROM users WHERE email=? AND password=?",
    [email, passwordHash],
    (err, row) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          error: "Login failed",
        });
      }

      if (!row) {
        return res.status(401).json({
          error: "Invalid email or password.",
        });
      }

      res.json({
        message: "Login successful",
        user: {
          id: row.id,
          fullName: row.username,
          email: row.email,
        },
      });
    }
  );
};