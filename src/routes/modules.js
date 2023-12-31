const express = require("express");
const router = express.Router();
const connectDB = require("../middleware/connectDB");
router.use(express.json());

router.get("/get", async (req, res) => {
  // #swagger.tags = ['Modules']
  try {
    const connection = await connectDB();

    const [result] = await connection.query("SELECT * FROM modules");
    await connection.end();

    res.json(result);
  } catch (error) {
    console.error("Error in the database query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/get/:id", async (req, res) => {
  // #swagger.tags = ['Modules']
  try {
    const connection = await connectDB();
    const id = req.params.id;

    const [result] = await connection.query(
      "SELECT * FROM modules WHERE id = ?",
      [id]
    );
    await connection.end();

    res.json({ data: result });
  } catch (error) {
    console.error("Error in the database query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/create", async (req, res) => {
  // #swagger.tags = ['Modules']
  try {
    const connection = await connectDB();
    const {name, description, active_flag, deleted_flag, creating_user_id} = req.body;
    const create_at = new Date();
    sql =
      "INSERT INTO modules ( name, description, active_flag, deleted_flag, creating_user_id, create_at) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [name, description, active_flag, deleted_flag, creating_user_id, create_at];

    const [result] = await connection.query(sql, values);
    await connection.end();

    res.json({ modules_id: result.insertId });
  } catch (error) {
    console.error("Error while creating module in database:", error);
    return res.status(500).json({ error: error });
  }
});

router.put("/update/:id", async (req, res) => {
  // #swagger.tags = ['Modules']
  try{
    const connection = await connectDB();
    const id = req.params.id;
    const {name, description, active_flag, deleted_flag, creating_user_id} = req.body;
    const updatedFields = req.body;
    const update_at = new Date();

    const sql = "UPDATE modules SET ?, update_at = ? WHERE id = ?";
    const values = [updatedFields, update_at, id];

    const [result] = await connection.query(sql, values);
    await connection.end();

    res.json({ data: result });
  } catch (error) {
    console.error("Error while updating module in database:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  // #swagger.tags = ['Modules']
  try{
    const connection = await connectDB();
    const id = req.params.id;

    const sql = "DELETE FROM modules WHERE id = ?";

    const [result] = await connection.query(sql, [id]);
    await connection.end();

    res.json({ data: result });
  }catch (error){
    console.error("Error deleting modules from database:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/getModuleProgress", async (req, res) => {
  // #swagger.tags = ['Modules']
  try{
    const connection = await connectDB();
    const {course_id, student_id} = req.body;

    const sql = "SELECT * FROM view_student_module_progress WHERE course_id = ? AND student_id = ? ORDER BY module_id";

    const [result] = await connection.query(sql, [course_id, student_id]);
    await connection.end();

    res.json({ data: result });
  }catch (error){
    console.error("Error getting modules progress from database:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
