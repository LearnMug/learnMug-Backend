const express = require("express");
const router = express.Router();
const connectDB = require("../middleware/connectDB");
router.use(express.json());

router.get('/get', async (req, res) => {
  // #swagger.tags = ['Categories']
  try {
    const connection = await connectDB();

    const [result] = await connection.query('SELECT * FROM classes');
    await connection.end();
    
    res.json({ data: result });
  } catch (error) {
    console.error('Error in the database query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

router.get('/get/:id', async (req, res) => {
  // #swagger.tags = ['Categories']
  try {
    const connection = await connectDB();
    const id = req.params.id

    const [result] = await connection.query("SELECT * FROM classes WHERE id = ?", [id]);
    await connection.end();

    res.json({ data: result });
  } catch (error) {
    console.error("Error in the database query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
})

router.post("/create", async (req, res) => {
  // #swagger.tags = ['Categories']
  try{
    const connection = await connectDB();;
    const { name, videos, active_flag, deleted_flag, creating_user_id } = req.body;
    const create_at = new Date()

    sql =
      "INSERT INTO classes ( name, videos, active_flag, deleted_flag, creating_user_id, create_at ) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [name, videos, active_flag, deleted_flag, creating_user_id, create_at];

    const [result] = await connection.query(sql, values);
    await connection.end();

    res.json({ classes_id: result.insertId });
  }catch(error){
    console.error("Error when creating classes in database:", error);
    res.status(401).json({ error: error });
  }
});

router.put("/update-classes/:id", async (req, res) => {
  // #swagger.tags = ['Categories']
  try{
    const connection = await connectDB();
    const id = req.params.id;
    const { name, videos, active_flag, deleted_flag, updater_user_id } = req.body;
    const updatedFields = req.body;
    const update_at = new Date()

    const sql = "UPDATE classes SET ?, update_at = ? WHERE id = ?";
    const values = [updatedFields, update_at, id];

    const [result] = await connection.query(sql, values);
    await connection.end();

    res.json({ data: result });
  }catch(error){
    console.error("Error when updating classes in database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/delete-classes/:id", async (req, res) => {
  // #swagger.tags = ['Categories']
  try{
    const connection = await connectDB();
    const id = req.params.id;

    const sql = "DELETE FROM classes WHERE id = ?";

    const [result] = await connection.query(sql, [id]);
    await connection.end();

    res.json({ data: result });
  }catch(error){
    console.error("Error when deleting classes from database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;