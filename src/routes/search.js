const express = require("express");
const router = express.Router();
const connectDB = require("../middleware/connectDB");
router.use(express.json());
const axios = require('axios');

const BASE_URL = "https://learn-mug-backend.vercel.app/search"

router.post("/", async (req, res) => {
  const { name } = req.body;

  const dados = {
      name: name
  }

  const resultCoursesByName = await axios.post(`${BASE_URL}/get-courses-by-name-or-syllabus`, dados);
  const resultCategoriesByName = await axios.post(`${BASE_URL}/get-categorie-by-name`, dados);

  res.json({ data: {courses: resultCoursesByName.data, categories: resultCategoriesByName.data} });
});

router.post("/get-courses-by-name-or-syllabus", async (req, res) => {
  // #swagger.tags = ['Search']
  try {
    const connection = await connectDB();
    const { name } = req.body;

    const [result] = await connection.query("SELECT * FROM view_courses WHERE name LIKE ? OR course_syllabus LIKE ?", [`%${name}%`, `%${name}%`]);
    await connection.end();

    res.json({ data: result });
  } catch (error) {
    console.error("Error in the database query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/get-categorie-by-name", async (req, res) => {
  // #swagger.tags = ['Search']
  try {
    const connection = await connectDB();
    const { name } = req.body;

    const [result] = await connection.query("SELECT * FROM view_categories WHERE name LIKE ?", [`%${name}%`]);
    await connection.end();

    res.json({ data: result });
  } catch (error) {
    console.error("Error in the database query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/get-professor", async (req, res) => {
  // #swagger.tags = ['Search']
  try {
    const connection = await connectDB();
    const { name } = req.body;

    const [result] = await connection.query("SELECT * FROM view_users WHERE name LIKE ? AND type_user_id = ?", [`%${name}%`, 2]);
    await connection.end();

    res.json({ data: result });
  } catch (error) {
    console.error("Error in the database query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
