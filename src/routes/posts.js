const express = require("express");
const router = express.Router();
const connectDB = require("../middleware/connectDB");
router.use(express.json());

router.post("/create", async (req, res) => {
  // #swagger.tags = ['Posts']
  try {
    const connection = await connectDB();
    const { title, content, image, creating_user_id, category_id } = req.body;
    const create_at = new Date();

    sql =
      "INSERT INTO posts (title, content, image, category_id, creating_user_id, create_at) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [title, content, image, category_id, creating_user_id, create_at];

    const [result] = await connection.query(sql, values);
    await connection.end();

    res.json({ post_id: result.insertId });
  } catch (error) {
    console.error("Error while creating Post in database:", error);
    res.status(401).json({ error: "Internal server error" });
  }
});

router.get("/get", async (req, res) => {
  // #swagger.tags = ['Posts']
  try {
    const connection = await connectDB();

    const [result] = await connection.query("SELECT * FROM view_posts");
    await connection.end();

    res.json({ data: result });
  } catch (error) {
    console.error("Error in the database query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/get/:id", async (req, res) => {
  // #swagger.tags = ['Posts']
  try {
    const connection = await connectDB();
    const id = req.params.id;

    const [result] = await connection.query(
      "SELECT * FROM view_posts WHERE id = ?",
      [id]
    );
    await connection.end();

    res.json({ data: result });
  } catch (error) {
    console.error("Error in the database query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/update/:id", async (req, res) => {
  // #swagger.tags = ['Posts']
  try {
    const connection = await connectDB();
    const id = req.params.id;
    const { title, content, image, category_id } = req.body;
    const updatedFields = req.body;

    const sql = "UPDATE posts SET ? WHERE id = ?";
    const values = [updatedFields, id];

    const [result] = await connection.query(sql, values);
    await connection.end();

    res.json({ data: result });
  } catch (error) {
    console.error("Error while editing Post in database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  // #swagger.tags = ['Posts']
  try {
    const connection = await connectDB();
    const id = req.params.id;

    const sql = "DELETE FROM posts WHERE id = ?";

    const [result] = await connection.query(sql, [id]);
    connection.end();

    res.json({ data: result });
  } catch (error) {
    console.error("Error deleting Course from database:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
