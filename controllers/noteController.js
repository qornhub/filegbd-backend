// noteController.js
const db = require("../config/db");

// ---------------------- GET NOTES ----------------------
exports.getNotes = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM notes WHERE user_id = ? ORDER BY created_at DESC",
      [req.user.id]
    );

    return res.json(rows);
  } catch (err) {
    console.error("❌ Error fetching notes:", err);
    return res.status(500).json({ message: "Error fetching notes" });
  }
};

// ---------------------- CREATE NOTE ----------------------
exports.createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    const [result] = await db.query(
      "INSERT INTO notes (user_id, title, content) VALUES (?, ?, ?)",
      [req.user.id, title, content]
    );

    return res.json({
      id: result.insertId,
      title,
      content
    });
  } catch (err) {
    console.error("❌ Error creating note:", err);
    return res.status(500).json({ message: "Error creating note" });
  }
};

// ---------------------- UPDATE NOTE ----------------------
exports.updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    await db.query(
      "UPDATE notes SET title = ?, content = ? WHERE id = ? AND user_id = ?",
      [title, content, req.params.id, req.user.id]
    );

    return res.json({ message: "Note updated" });

  } catch (err) {
    console.error("❌ Error updating note:", err);
    return res.status(500).json({ message: "Error updating note" });
  }
};

// ---------------------- DELETE NOTE ----------------------
exports.deleteNote = async (req, res) => {
  try {
    await db.query(
      "DELETE FROM notes WHERE id = ? AND user_id = ?",
      [req.params.id, req.user.id]
    );

    return res.json({ message: "Note deleted" });

  } catch (err) {
    console.error("❌ Error deleting note:", err);
    return res.status(500).json({ message: "Error deleting note" });
  }
};
