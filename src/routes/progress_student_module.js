const express = require("express");
const router = express.Router();
const connectDB = require("../middleware/connectDB");
router.use(express.json());

router.post("/create", async (req, res) => {
  // #swagger.tags = ['Progress Student Modules']
  try {
    const connection = await connectDB();
    const { student_id, module_id, progress } = req.body;

    sql =
      "INSERT INTO progress_student_module (student_id, module_id, progress) VALUES (?, ?, ?)";
    const values = [student_id, module_id, progress];

    const [result] = await connection.query(sql, values);
    await connection.end();

    res.json({ progress_student_module_id: result.insertId });
  } catch (error) {
    console.error("Error while creating student progress in module in database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/get", async (req, res) => {
  // #swagger.tags = ['Progress Student Modules']
  try {
    const connection = await connectDB();

    const [result] = await connection.query(
      "SELECT * FROM progress_student_module"
    );
    await connection.end();
    
    res.json({ data: result });
  } catch (error) {
    console.error("Error in the database query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/get/:id", async (req, res) => {
  // #swagger.tags = ['Progress Student Modules']
  try {
    const connection = await connectDB();
    const id = req.params.id;

    const [result] = await connection.query(
      "SELECT * FROM progress_student_module WHERE id = ?",
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
  // #swagger.tags = ['Progress Student Modules']
  try {
    const connection = await connectDB();
    const id = req.params.id;
    const { student_id, module_id, progress } = req.body;
    const updatedFields = req.body;

    const sql = "UPDATE progress_student_module SET ? WHERE id = ?";
    const values = [updatedFields, id];

    const [result] = await connection.query(sql, values);
    await connection.end();

    res.json({ data: result });
  } catch (error) {
    console.error("Error while editing student progress in module in database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  // #swagger.tags = ['Progress Student Modules']
  try {
    const connection = await connectDB();
    const id = req.params.id;
    const sql = "DELETE FROM progress_student_module WHERE id = ?";

    const [result] = await connection.query(sql, [id]);
    await connection.end();

    res.json({ data: result });
  } catch (error) {
    console.error("Error when deleting student progress in database module:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/progress-student-module", async (req, res) => {
  // #swagger.tags = ['Progress Student Modules']
  try{
    const connection = await connectDB();
    const { module_id, student_id } = req.body;

    const [result] = await connection.query("SELECT * FROM view_progress_student_module WHERE student_id = ? AND module_id = ?", [student_id, module_id]);
    await connection.end();
    
    res.status(201).json({ data: result });
  }catch(error){
    console.error("Error in the database query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
