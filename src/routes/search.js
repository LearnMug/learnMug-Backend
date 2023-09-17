const express = require("express");
const router = express.Router();
const connectDB = require("../middleware/connectDB");
router.use(express.json());

router.post("/get-courses-by-name", async (req, res) => {
  // #swagger.tags = ['Search']
  try {
    const connection = await connectDB();
    const { name } = req.body;

    const [result] = await connection.query("SELECT * FROM courses WHERE name LIKE ?", [`%${name}%`]);
    await connection.end();

    res.json({ data: result });
  } catch (error) {
    console.error("Error in the database query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
