const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = (req, res) => {
  const { name, email, password } = req.body;

//check if user exists
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (result.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashed = bcrypt.hashSync(password, 10);

    db.query(
      "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
      [name, email, hashed],
      (err2) => {
        if (err2) return res.status(500).json({ message: "Registration failed" });

        res.json({ success: true, message: "Registration successful" });
      }
    );
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (result.length === 0)
      return res.status(400).json({ message: "Invalid email or password" });

    const user = result[0];

    const isMatch = bcrypt.compareSync(password, user.password_hash);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      "SECRET_KEY_123",
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  });
};
