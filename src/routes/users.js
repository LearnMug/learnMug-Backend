const express = require("express");
const router = express.Router();
const connectDB = require("../middleware/connectDB");
router.use(express.json());

router.post("/create", async (req, res) => {
  // #swagger.tags = ['Users']
  try {
    const connection = await connectDB();
    const { name, email, password, profile_img, type_user_id } = req.body;
    const create_at = new Date();

    const sql =
      "INSERT INTO users (name, email, password, profile_img, type_user_id, create_at) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [name, email, password, profile_img, type_user_id, create_at];

    const [result] = await connection.query(sql, values);
    await connection.end();

    res.json({ cliente_id: result.insertId });
  } catch (error) {
    console.error("Erro ao criar usuário no banco de dados:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

router.get("/get-users", async (req, res) => {
  // #swagger.tags = ['Users']
  try {
    const connection = await connectDB();
    const [results] = await connection.query("SELECT * FROM users");
    await connection.end();
    res.json({ data: results });
  } catch (error) {
    console.error("Erro na consulta ao banco de dados:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

router.get("/get-user/:id", async (req, res) => {
  // #swagger.tags = ['Users']
  try {
    const connection = await connectDB();
    const id = req.params.id;
    const [results] = await connection.query("SELECT * FROM users WHERE id = ?", [id]);
    await connection.end();
    res.json({ data: results });
  } catch (error) {
    console.error("Erro na consulta ao banco de dados:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

router.put("/update/:id", async (req, res) => {
  // #swagger.tags = ['Users']
  try {
    const connection = await connectDB();
    const id = req.params.id;
    const updatedFields = req.body;
    const update_at = new Date();

    const sql = "UPDATE users SET ? , update_at = ? WHERE id = ?";
    const values = [updatedFields, update_at, id];

    const [results] = await connection.query(sql, values);
    await connection.end();

    res.json({ data: results });
  } catch (error) {
    console.error("Erro ao editar usuário no banco de dados:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  // #swagger.tags = ['Users']
  try {
    const connection = await connectDB();
    const id = req.params.id;

    const sql = "DELETE FROM users WHERE id = ?";
    const [results] = await connection.query(sql, [id]);
    await connection.end();

    res.json({ data: results });
  } catch (error) {
    console.error("Erro ao excluir usuário do banco de dados:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

module.exports = router;
