const express = require("express");
const router = express.Router();
const connectDB = require("../middleware/connectDB");
router.use(express.json());

router.post("/create", async (req, res) => {
  // #swagger.tags = ['Users']
  try {
    const connection = await connectDB();
    const { name, email, password, phone_number, profile_img, type_user_id } = req.body;
    const create_at = new Date();

    const sql =
      "INSERT INTO users (name, email, password, phone_number, profile_img, type_user_id, create_at) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [name, email, password, phone_number, profile_img, type_user_id, create_at];

    const [result] = await connection.query(sql, values);
    await connection.end();

    res.json({ cliente_id: result.insertId });
  } catch (error) {
    console.error("Error while creating user in database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/get", async (req, res) => {
  // #swagger.tags = ['Users']
  try {
    const connection = await connectDB();
    const [result] = await connection.query("SELECT * FROM users");
    await connection.end();
    res.json({ data: result });
  } catch (error) {
    console.error("Error in the database query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/get/:id", async (req, res) => {
  // #swagger.tags = ['Users']
  try {
    const connection = await connectDB();
    const id = req.params.id;
    const [result] = await connection.query("SELECT * FROM users WHERE id = ?", [id]);
    await connection.end();
    res.json({ data: result });
  } catch (error) {
    console.error("Error in the database query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/update/:id", async (req, res) => {
  // #swagger.tags = ['Users']
  try {
    const connection = await connectDB();
    const id = req.params.id;
    const { name, email, password, phone_number, profile_img, type_user_id } = req.body;
    const updatedFields = req.body;
    const update_at = new Date();

    const sql = "UPDATE users SET ? , update_at = ? WHERE id = ?";
    const values = [updatedFields, update_at, id];

    const [result] = await connection.query(sql, values);
    await connection.end();

    res.json({ data: result });
  } catch (error) {
    console.error("Error while editing user in database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  // #swagger.tags = ['Users']
  try {
    const connection = await connectDB();
    const id = req.params.id;

    const sql = "DELETE FROM users WHERE id = ?";
    const [result] = await connection.query(sql, [id]);
    await connection.end();

    res.json({ data: result });
  } catch (error) {
    console.error("Error when deleting user from database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/update-preferences/:id", async (req, res) => {
  // #swagger.tags = ['Users']

  const connection = await connectDB();
  const id = req.params.id;

  const { preferences } = req.body;
  const updatedFields = req.body;
  const update_at = new Date();

  const sql = "UPDATE users SET ? , update_at = ? WHERE id = ?";
  const values = [updatedFields, update_at, id];

  const [result] = await connection.query(sql, values);
  await connection.end();

  res.json({ data: result });
});

module.exports = router;
