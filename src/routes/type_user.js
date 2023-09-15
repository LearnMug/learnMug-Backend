const express = require("express");
const connectDB = require("../middleware/connectDB");
const router = express.Router();
router.use(express.json());

router.get('/get-type-user', async (req, res) => {
  // #swagger.tags = ['Type Users']
  try {
    const connection = await connectDB();
    const [results] = await connection.query('SELECT * FROM types_user');
    await connection.end();
    res.json(results);
  } catch (error) {
    console.error('Erro ao consultar o MySQL:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.get('/get-type-user/:id', async (req, res) => {
  // #swagger.tags = ['Type Users']
  try {
    const connection = await connectDB();
    const id = req.params.id;

    const [results] = await connection.query("SELECT * FROM types_user WHERE id = ?", [id]);
    await connection.end();

    res.json({ data: results });
  } catch (error) {
    console.error("Erro na consulta ao banco de dados:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

router.post("/create-type-user", async (req, res) => {
  // #swagger.tags = ['Type Users']
  const connection = await connectDB();
  const { description } = req.body;

  const sql = "INSERT INTO types_user (description) VALUES (?)";
  const values = [description];

  try {
    const [results] = await connection.query(sql, values);
    await connection.end();
    res.json({ type_user_id: results.insertId });
  } catch (error) {
    console.error("Erro ao criar type_user no banco de dados:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

router.put("/update-type-user/:id", async (req, res) => {
  // #swagger.tags = ['Type Users']
  const connection = await connectDB();
  const id = req.params.id;
  const updatedFields = req.body;

  const sql = "UPDATE types_user SET ? WHERE id = ?";
  const values = [updatedFields, id];

  try {
    const [results] = await connection.query(sql, values);
    await connection.end();
    res.json({ data: results });
  } catch (error) {
    console.error("Erro ao atualizar types_user no banco de dados:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

router.delete("/delete-type-user/:id", async (req, res) => {
  // #swagger.tags = ['Type Users']
  const connection = await connectDB();
  const id = req.params.id;

  const sql = "DELETE FROM types_user WHERE id = ?";

  try {
    const [results] = await connection.query(sql, [id]);
    await connection.end();
    res.json({ data: results });
  } catch (error) {
    console.error("Erro ao excluir types_user do banco de dados:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

module.exports = router;
