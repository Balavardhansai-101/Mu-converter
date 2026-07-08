const crypto = require('crypto');
const db = require('../db');

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

function ensureUsersTable(callback) {
  const createTableSql = `CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) DEFAULT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`;
  db.query(createTableSql, callback);
}

exports.signup = (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ error: 'Full name, email, and password are required.' });
  }

  const passwordHash = hashPassword(password);

  ensureUsersTable((tableErr) => {
    if (tableErr) {
      console.error('Failed to create users table:', tableErr);
      return res.status(500).json({ error: 'Unable to prepare user storage.' });
    }

    const insertSql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(insertSql, [fullName, email, passwordHash], (insertErr, result) => {
      if (insertErr) {
        console.error('Signup insert failed:', insertErr);
        if (insertErr.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ error: 'Email already exists. Please login or use another email.' });
        }
        return res.status(500).json({ error: 'Failed to create account.' });
      }

      res.json({ message: 'Signup successful', user: { id: result.insertId, fullName, email } });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const passwordHash = hashPassword(password);
  const selectSql = 'SELECT id, username, email FROM users WHERE email = ? AND password = ? LIMIT 1';

  db.query(selectSql, [email, passwordHash], (queryErr, users) => {
    if (queryErr) {
      console.error('Login query failed:', queryErr);
      return res.status(500).json({ error: 'Login failed. Please try again.' });
    }

    if (!users.length) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const user = users[0];
    res.json({ message: 'Login successful', user: { id: user.id, fullName: user.username, email: user.email } });
  });
};
