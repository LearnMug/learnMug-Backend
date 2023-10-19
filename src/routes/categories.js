const express = require("express");
const router = express.Router();
const connectDB = require("../middleware/connectDB");
router.use(express.json());

router.get('/get', async (req, res) => {
  // #swagger.tags = ['Categories']
  try {
    const connection = await connectDB();
    
    const [result] = await connection.query('SELECT * FROM categories');
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

    const [result] = await connection.query("SELECT * FROM categories WHERE id = ?", [id]);
    await connection.end();

    res.json({ data: result });
  } catch (error) {
    console.error("Error in the database query:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
})

router.post("/create", async (req, res) => {
  // #swagger.tags = ['Categories']
  try{
    const connection = await connectDB();
    const { name, active_flag, deleted_flag, creating_user_id } = req.body;
    const create_at = new Date()
    sql =
      "INSERT INTO categories ( name, active_flag, deleted_flag, creating_user_id, create_at ) VALUES (?, ?, ?, ?, ?)";
    const values = [name, active_flag, deleted_flag, creating_user_id, create_at];

    const [result] = await connection.query(sql, values);
    connection.end();

    res.json({ categories_id: result.insertId });
  }catch(error){
    console.error("Error while creating Categories in database:", error);
    res.status(401).json({ error: error });
  }
});

router.put("/update-categories/:id", async (req, res) => {
  // #swagger.tags = ['Categories']
  try{
    const connection = await connectDB();
    const id = req.params.id;
    const { name, active_flag, deleted_flag, updater_user_id } = req.body;
    const updatedFields = req.body;
    const update_at = new Date()

    const sql = "UPDATE categories SET ?, update_at = ? WHERE id = ?";
    const values = [updatedFields, update_at, id];

    const [result] = await connection.query(sql, values);
    await connection.end();

    res.json({ data: result });
  }catch(error){
    console.error("Error while updating Categories in database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/delete-categories/:id", async (req, res) => {
  // #swagger.tags = ['Categories']
  try{
    const connection = await connectDB();
    const id = req.params.id;

    const sql = "DELETE FROM categories WHERE id = ?";

    const [result] = await connection.query(sql, [id]);
    await connection.end();

    res.json({ data: result });
  }catch(error){
    console.error("Error deleting Categories from database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/getMainCategories", async (req, res) => {
  // #swagger.tags = ['Categories']
  try {
    const connection = await connectDB();

    const [result] = await connection.query(`SELECT DISTINCTROW categorie_id, categorie_name, categorie_image FROM view_course_categories LIMIT 5;`);
    await connection.end();

    res.json({ data: result });
  } catch (error) {
    console.error("Error in the database query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/getBestSellersByCategory/:id", async (req, res) => {
  // #swagger.tags = ['Categories']
  try {
    const connection = await connectDB();
    const id = req.params.id;
    //const sql = "SELECT course_id, cover_img, course_name FROM view_course_student_categories WHERE categorie_id = ? GROUP BY course_id, cover_img, course_name ORDER BY COUNT(student_id) DESC LIMIT 5"

    const sql = `SELECT cs.course_id, cs.cover_img, cs.course_name, cs.ratings, cs.number_of_ratings, cs.pricing, 
    COUNT(cs.student_id) AS student_count, cp.user_name FROM view_course_student_categories cs 
    LEFT JOIN view_course_professor cp ON cp.course_id = cs.course_id 
    WHERE cs.categorie_id = ?
    GROUP BY cs.course_id, cs.cover_img, cs.course_name, cs.ratings, cs.number_of_ratings, cs.pricing, cp.user_name 
    ORDER BY student_count DESC LIMIT 5;`;
    const [result] = await connection.query(sql, [id]);
    await connection.end();

    res.json({ data: result });
  } catch (error) {
    console.error("Error in the database query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;