const express = require("express");
const router = express.Router();
const connectDB = require("../middleware/connectDB");
router.use(express.json());

router.post("/create", async (req, res) => {
  // #swagger.tags = ['Course Students']
  try{
    const connection = await connectDB();
    const { course_id, student_id, progress } = req.body;

    sql =
      "INSERT INTO course_students (course_id, student_id, progress) VALUES (?, ?, ?)";
    const values = [course_id, student_id, progress];

    const [result] = await connection.query(sql, values);
    await connection.end();

    res.json({ course_students_id: result.insertId });
  }catch(error){
    console.error("Error while creating Course Students in database:", error);
    res.status(401).json({ error: "Internal server error" });
  }
});

router.get("/get", async (req, res) => {
  // #swagger.tags = ['Course Students']
  try{
    const connection = await connectDB();

    const [result] = await connection.query("SELECT * FROM course_students");
    connection.end();
    
    res.json({ data: result });
  }catch(error){
    console.error("Error in the database query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/get/:id", async (req, res) => {
  // #swagger.tags = ['Course Students']
  try{
    const connection = await connectDB();
    const id = req.params.id;

    const [result] = await connection.query("SELECT * FROM course_students WHERE id = ?", [id]);
    connection.end();
    
    res.json({ data: result });
  }catch(error){
    console.error("Error in the database query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/update/:id", async (req, res) => {
  // #swagger.tags = ['Course Students']
  try{
    const connection = await connectDB();
    const id = req.params.id;
    const { course_id, student_id, progress } = req.body;
    const updatedFields = req.body;

    const sql = "UPDATE course_students SET ? WHERE id = ?";
    const values = [updatedFields, id];

    const [result] = await connection.query(sql, values);
    await connection.end();

    res.json({ data: result });
  }catch(error){
    console.error("Error while editing Course Students in database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  // #swagger.tags = ['Course Students']
  try{
    const connection = await connectDB();
    const id = req.params.id;

    const sql = "DELETE FROM course_students WHERE id = ?";

    const [result] = await connection.query(sql, [id]);
    await connection.end();

    res.json({ data: result });
  }catch(error){
    console.error("Error while deleting Course Students in database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/all-courses-of-student/:id", async (req, res) => {
  // #swagger.tags = ['Course Students']
  try{
    const connection = await connectDB();
    const id = req.params.id;

    const [result] = await connection.query("SELECT * FROM view_course_students WHERE student_id = ?", [id]);
    await connection.end();
    
    res.status(200).json({ data: result });
  }catch(error){
    console.error("Error in the database query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
