const express = require("express");
const mysql = require("mysql2");
const router = express.Router();
router.use(express.json());

router.post("/create", function (req, res) {
  // #swagger.tags = ['Messages']
  const connection = mysql.createConnection(process.env.DATABASE_URL);
  const { subject, message, creating_user_id } = req.body;
  const create_at = new Date();

  sql =
    "INSERT INTO messages (subject, message, creating_user_id, create_at) VALUES (?, ?, ?, ?)";
  const values = [subject, message, creating_user_id, create_at];

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error("Erro ao criar mensagem no banco de dados:", err);
      return res.status(401).json({ error: err });
    }

    res.json({ message_id: results.insertId });
  });
});

router.get("/get-messages", (req, res) => {
  // #swagger.tags = ['Messages']
  const connection = mysql.createConnection(process.env.DATABASE_URL);

  connection.query("SELECT * FROM messages", (err, results) => {
    if (err) {
      console.error("Erro na consulta ao banco de dados:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    res.json({ data: results });
  });
});

router.get("/get-messages/:id", (req, res) => {
  // #swagger.tags = ['Messages']
  const connection = mysql.createConnection(process.env.DATABASE_URL);
  const id = req.params.id;

  connection.query("SELECT * FROM messages WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Erro na consulta ao banco de dados:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    res.json({ data: results });
  });
});

router.put("/update/:id", (req, res) => {
  // #swagger.tags = ['Messages']
  const connection = mysql.createConnection(process.env.DATABASE_URL);
  const id = req.params.id;
  const updatedFields = req.body;

  const sql = "UPDATE messages SET ? WHERE id = ?";
  const values = [updatedFields, id];

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error("Erro ao editar menssagem no banco de dados:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    res.json({ data: results });
  });
});

router.delete("/delete/:id", (req, res) => {
  // #swagger.tags = ['Messages']
  const connection = mysql.createConnection(process.env.DATABASE_URL);
  const id = req.params.id;

  const sql = "DELETE FROM messages WHERE id = ?";

  connection.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Erro ao excluir menssagem do banco de dados:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    res.json({ data: results });
  });
});

module.exports = router;
