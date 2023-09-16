const express = require("express");
const router = express.Router();
const connectDB = require("../middleware/connectDB");
router.use(express.json());

router.get('/get', async (req, res) => {
  // #swagger.tags = ['Course Modules']
  try {
    const connection = await connectDB();

    const [result] = await connection.query('SELECT * FROM course_modules');
    await connection.end()
      
    res.json({data: result});
  } catch (error) {
    console.error('Error in the database query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

router.get('/get/:id', async (req, res) => {
  // #swagger.tags = ['Course Modules']
  try {
    const connection = await connectDB();
    const id = req.params.id

    const [result] = await connection.query("SELECT * FROM course_modules WHERE id = ?", [id]);
    await connection.end();

    res.json({ data: result });
  } catch (error) {
    console.error("Error in the database query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
})

router.post("/create", async (req, res) => {
  // #swagger.tags = ['Course Modules']
  try{
    const connection = await connectDB();
    const { course_id, module_id } = req.body;

    sql =
      "INSERT INTO course_modules ( course_id, module_id ) VALUES (?, ?)";
    const values = [course_id, module_id];

    const [result] = await connection.query(sql, values);
    await connection.end();

    res.json({ course_modules_id: result.insertId });
  }catch(error){
    console.error("Error while creating course modules in database:", error);
    res.status(401).json({ error: err });
  } 
});

router.put("/update/:id", async (req, res) => {
  // #swagger.tags = ['Course Modules']
  try{
    const connection = await connectDB();
    const id = req.params.id;
    const { course_id, module_id } = req.body;
    const updatedFields = req.body;

    const sql = "UPDATE course_modules SET ? WHERE id = ?";
    const values = [updatedFields, id];

    const [result] = await connection.query(sql, values);
    await connection.end();

    res.json({ data: result });
  }catch(error){
    console.error("Error updating course modules in database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  // #swagger.tags = ['Course Modules']
  try{
    const connection = await connectDB();
    const id = req.params.id;

    const sql = "DELETE FROM course_modules WHERE id = ?";

    const [result] = await connection.query(sql, [id]);
    await connection.end();

    res.json({ data: result });
  }catch(error){
    console.error("Error deleting course modules from database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;