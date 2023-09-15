const express = require("express");
const connectDB = require("../middleware/connectDB");
const router = express.Router();
router.use(express.json());

router.get('/get', async (req, res) => {
  // #swagger.tags = ['Type Users']
  try {
    const connection = await connectDB();
    const [results] = await connection.query('SELECT * FROM types_user');
    await connection.end();
    res.json(results);
  } catch (error) {
    console.error('Error in the database query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/get/:id', async (req, res) => {
  // #swagger.tags = ['Type Users']
  try {
    const connection = await connectDB();
    const id = req.params.id;

    const [results] = await connection.query("SELECT * FROM types_user WHERE id = ?", [id]);
    await connection.end();

    res.json({ data: results });
  } catch (error) {
    console.error("Error in the database query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/create", async (req, res) => {
  // #swagger.tags = ['Type Users']
  try {
    const connection = await connectDB();
    const { description } = req.body;

    const sql = "INSERT INTO types_user (description) VALUES (?)";
    const values = [description];

    const [results] = await connection.query(sql, values);
    await connection.end();
    res.json({ type_user_id: results.insertId });
  } catch (error) {
    console.error("Error when creating user type in database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/update/:id", async (req, res) => {
  // #swagger.tags = ['Type Users']
  try {
    const connection = await connectDB();
    const id = req.params.id;
    const { description } = req.body;
    const updatedFields = req.body;

    const sql = "UPDATE types_user SET ? WHERE id = ?";
    const values = [updatedFields, id];

    const [results] = await connection.query(sql, values);
    await connection.end();
    res.json({ data: results });
  } catch (error) {
    console.error("Error while updating user type in database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  // #swagger.tags = ['Type Users']
  try { 
    const connection = await connectDB();
    const id = req.params.id;

    const sql = "DELETE FROM types_user WHERE id = ?";

    const [results] = await connection.query(sql, [id]);
    await connection.end();
    res.json({ data: results });
  } catch (error) {
    console.error("Error when deleting user type from database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
