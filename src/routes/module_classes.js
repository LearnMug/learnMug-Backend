const express = require("express");
const router = express.Router();
const connectDB = require("../middleware/connectDB");
router.use(express.json());

router.get("/get", async (req, res) => {
  // #swagger.tags = ['Module Classes']
  try {
    const connection = await connectDB();

    const [result] = await connection.query("SELECT * FROM module_classes");
    await connection.end();

    res.json(result);
  } catch (error) {
    console.error("Error in the database query:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/get/:id", async (req, res) => {
  // #swagger.tags = ['Module Classes']
  try {
    const connection = await connectDB();
    const id = req.params.id;

    const [result] = await connection.query(
      "SELECT * FROM module_classes WHERE id = ?",
      [id]
    );
    await connection.end();

    res.json({ data: result });
  } catch (error) {
    console.error("Erro na consulta ao banco de dados:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/create", async (req, res) => {
  // #swagger.tags = ['Module Classes']
  try {
    const connection = await connectDB();
    const { module_id, classe_id } = req.body;
    sql = "INSERT INTO module_classes ( module_id, classe_id  ) VALUES (?, ?)";
    const values = [module_id, classe_id];

    const [result] = await connection.query(sql, values);
    await connection.end();

    res.json({ module_classes_id: result.insertId });
  } catch (error) {
    console.error("Error while creating module classe in database:", err);
    return res.status(401).json({ error: err });
  }
});

router.put("/update/:id", async (req, res) => {
  // #swagger.tags = ['Module Classes']
  try {
    const connection = await connectDB();
    const id = req.params.id;
    const { module_id, classe_id } = req.body;
    const updatedFields = req.body;

    const sql = "UPDATE module_classes SET ? WHERE id = ?";
    const values = [updatedFields, id];

    const [result] = await connection.query(sql, values);

    res.json({ data: result });
  } catch (error) {
    console.error("Error when updating module classe in database:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  // #swagger.tags = ['Module Classes']
  try{
    const connection = await connectDB();
    const id = req.params.id;

    const sql = "DELETE FROM module_classes WHERE id = ?";

    const [result] = await connection.query(sql, [id]);
    await connection.end();

    res.json({ data: result });
  }catch (error){
    console.error("Error deleting module classe from database:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
