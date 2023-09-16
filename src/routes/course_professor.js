const express = require("express");
const router = express.Router();
const connectDB = require("../middleware/connectDB");
router.use(express.json());

router.post("/create", async (req, res) => {
  // #swagger.tags = ['Course Professor']
  try{
    const connection = await connectDB();
    const { course_id, professor_id } = req.body;

    sql =
      "INSERT INTO course_professor (course_id, professor_id) VALUES (?, ?)";
    const values = [course_id, professor_id];

    const [result] = await connection.query(sql, values);
    await connection.end();

    res.json({ course_professor_id: result.insertId });
  }catch(error){
    console.error("Error while creating course professor in database:", error);
    res.status(401).json({ error: "Internal server error" });
  }
});

router.get("/get", async (req, res) => {
  // #swagger.tags = ['Course Professor']
  try{
    const connection = await connectDB();

    const [result] = await connection.query("SELECT * FROM course_professor");
    await connection.end();

    res.json({ data: result });
  }catch(error){
    console.error("Error in the database query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/get/:id", async (req, res) => {
  // #swagger.tags = ['Course Professor']
  try{
    const connection = await connectDB();
    const id = req.params.id;

    const [result] = await connection.query("SELECT * FROM course_professor WHERE id = ?", [id]);
    await connection.end();

    res.json({ data: result });
  }catch(error){
    console.error("Error in the database query:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/update/:id", async (req, res) => {
  // #swagger.tags = ['Course Professor']
  try{
    const connection = await connectDB();
    const id = req.params.id;
    const { course_id, professor_id } = req.body;
    const updatedFields = req.body;

    const sql = "UPDATE course_professor SET ? WHERE id = ?";
    const values = [updatedFields, id];

    const [result] = await connection.query(sql, values);
    await connection.end();

    res.json({ data: result });
  }catch(error){
    console.error("Error while editing course professor in database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  // #swagger.tags = ['Course Professor']
  try{
    const connection = await connectDB();
    const id = req.params.id;

    const sql = "DELETE FROM course_professor WHERE id = ?";

    const [result] = await connection.query(sql, [id]);
    connection.end();
    
    res.json({ data: result });
  }catch(error){
    console.error("Error deleting course professor from database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
