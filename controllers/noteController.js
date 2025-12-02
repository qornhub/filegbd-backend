const db = require("../config/db");

exports.getNotes = (req, res) => {
  db.query(
    "SELECT * FROM notes WHERE user_id = ? ORDER BY created_at DESC",
    [req.user.id],
    (err, rows) => {
      if (err) return res.status(500).json({ message: "Error fetching notes" });
      res.json(rows);
    }
  );
};

exports.createNote = (req, res) => {
  const { title, content } = req.body;
  db.query(
    "INSERT INTO notes (user_id, title, content) VALUES (?, ?, ?)",
    [req.user.id, title, content],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Error creating note" });

      res.json({ id: result.insertId, title, content });
    }
  );
};

exports.updateNote = (req, res) => {
  const { title, content } = req.body;

  db.query(
    "UPDATE notes SET title=?, content=? WHERE id=? AND user_id=?",
    [title, content, req.params.id, req.user.id],
    (err) => {
      if (err) return res.status(500).json({ message: "Error updating note" });

      res.json({ message: "Note updated" });
    }
  );
};

exports.deleteNote = (req, res) => {
  db.query(
    "DELETE FROM notes WHERE id=? AND user_id=?",
    [req.params.id, req.user.id],
    (err) => {
      if (err) return res.status(500).json({ message: "Error deleting note" });

      res.json({ message: "Note deleted" });
    }
  );
};
