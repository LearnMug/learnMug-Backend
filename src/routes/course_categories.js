const express = require("express");
const router = express.Router();
const connectDB = require("../middleware/connectDB");
router.use(express.json());

router.get('/get', async (req, res) => {
  // #swagger.tags = ['Courses Categories']
  try {
    const connection = await connectDB();

    const [result] =  await connection.query('SELECT * FROM course_categories');
    await connection.end();
    
    res.json({data: result});
  } catch (error) {
    console.error('Erro ao consultar o MySQL:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
})

router.get('/get/:id', async (req, res) => {
  // #swagger.tags = ['Courses Categories']
  try {
    const connection = await connectDB();
    const id = req.params.id

    const [result] =  await connection.query("SELECT * FROM course_categories WHERE id = ?", [id]);
    await connection.end();
    
    res.json({ data: result });
  } catch (error) {
    console.error("Erro na consulta ao banco de dados:", err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
})

router.post("/create", async (req, res) => {
  // #swagger.tags = ['Courses Categories']
  try{
    const connection = await connectDB();
    const { course_id, categorie_id } = req.body;

    sql =
      "INSERT INTO course_categories ( course_id, categorie_id ) VALUES (?, ?)";
    const values = [course_id, categorie_id];

    const [result] =  await connection.query(sql, values);
    await connection.end();

    res.json({ course_categories_id: result.insertId });
  }catch(error){
    console.error("Erro ao criar course_categories no banco de dados:", error);
    res.status(401).json({ error: "Erro interno do servidor" });
  }
});

router.put("/update/:id", async (req, res) => {
  // #swagger.tags = ['Courses Categories']
  try{
    const connection = await connectDB();
    const id = req.params.id;
    const { course_id, categorie_id } = req.body;
    const updatedFields = req.body;

    const sql = "UPDATE course_categories SET ? WHERE id = ?";
    const values = [updatedFields, id];

    const [result] =  await connection.query(sql, values);
    await connection.end();

    res.json({ data: result });
  }catch(error){
    console.error("Erro ao atualizar course_categories no banco de dados:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  // #swagger.tags = ['Courses Categories']
  try{
    const connection = await connectDB();
    const id = req.params.id;

    const sql = "DELETE FROM course_categories WHERE id = ?";

    const [result] =  await connection.query(sql, [id]);
    await connection.end();

    res.json({ data: result });
  }catch(error){
    console.error("Erro ao excluir course_categories do banco de dados:", err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

module.exports = router;