const express = require("express");
const router = express.Router();
const connectDB = require("../middleware/connectDB");
router.use(express.json());

router.post("/create", async (req, res) => {
  // #swagger.tags = ['Courses']
  try {
    const connection = await connectDB();
    const { name, description, cover_img, ratings, number_of_ratings, course_syllabus, creating_user_id } = req.body;
    const create_at = new Date();

    sql =
      "INSERT INTO courses (name, description, cover_img, ratings, number_of_ratings, course_syllabus, creating_user_id, create_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [name, description, cover_img, ratings, number_of_ratings, course_syllabus, creating_user_id, create_at];

    const [result] = await connection.query(sql, values);
    await connection.end();

    res.json({ course_id: result.insertId });
  } catch (error) {
    console.error("Error while creating Course in database:", error);
    res.status(401).json({ error: "Internal server error" });
  }
});

router.get("/get", async (req, res) => {
  // #swagger.tags = ['Courses']
  try {
    const connection = await connectDB();

    const [result] = await connection.query("SELECT * FROM courses");
    await connection.end();

    res.json({ data: result });
  } catch (error) {
    console.error("Error in the database query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/get/:id", async (req, res) => {
  // #swagger.tags = ['Courses']
  try {
    const connection = await connectDB();
    const id = req.params.id;

    const [result] = await connection.query("SELECT * FROM courses WHERE id = ?", [id]);
    await connection.end();

    res.json({ data: result });
  } catch (error) {
    console.error("Error in the database query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/update/:id", async (req, res) => {
  // #swagger.tags = ['Courses']
  try {
    const connection = await connectDB();
    const id = req.params.id;
    const { name, description, cover_img, ratings, number_of_ratings, course_syllabus, creating_user_id } = req.body;
    const updatedFields = req.body;
    const update_at = new Date();

    const sql = "UPDATE courses SET ? , update_at = ? WHERE id = ?";
    const values = [updatedFields, update_at, id];

    const [result] = await connection.query(sql, values);
    await connection.end();

    res.json({ data: result });
  } catch (error) {
    console.error("Error while editing Course in database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  // #swagger.tags = ['Courses']
  try {
    const connection = await connectDB();
    const id = req.params.id;

    const sql = "DELETE FROM courses WHERE id = ?";

    const [result] = await connection.query(sql, [id]);
    connection.end();

    res.json({ data: result });
  } catch (error) {
    console.error("Error deleting Course from database:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/getBestSellers", async (req, res) => {
  // #swagger.tags = ['Courses']
  try {
    const connection = await connectDB();

    const [result] = await connection.query(`SELECT course_id, cover_img, course_name FROM view_course_students GROUP BY course_id, cover_img, course_name ORDER BY COUNT(student_id) DESC LIMIT 5`);
    await connection.end();

    res.json({ data: result });
  } catch (error) {
    console.error("Error in the database query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
