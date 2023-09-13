const express = require("express");
const mysql = require("mysql2");
const router = express.Router();
router.use(express.json());

router.post("/create", function (req, res) {
  const connection = mysql.createConnection(process.env.DATABASE_URL);
  const { name, email, password, profile_img, type_user_id } = req.body;
  const create_at = new Date();

  sql =
    "INSERT INTO users (name, email, password, profile_img, type_user_id, create_at) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [name, email, password, profile_img, type_user_id, create_at];

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error("Erro ao criar user no banco de dados:", err);
      return res.status(401).json({ error: err });
    }

    res.json({ cliente_id: results.insertId });
  });
});

router.get("/get-users", (req, res) => {
  const connection = mysql.createConnection(process.env.DATABASE_URL);

  connection.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.error("Erro na consulta ao banco de dados:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    res.json({ data: results });
  });
});

router.get("/get-user/:id", (req, res) => {
  const connection = mysql.createConnection(process.env.DATABASE_URL);
  const id = req.params.id;

  connection.query("SELECT * FROM users WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Erro na consulta ao banco de dados:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    res.json({ data: results });
  });
});

router.put("/update/:id", (req, res) => {
  const connection = mysql.createConnection(process.env.DATABASE_URL);
  const id = req.params.id;
  const updatedFields = req.body;
  const update_at = new Date();

  const sql = "UPDATE users SET ? , update_at = ? WHERE id = ?";
  const values = [updatedFields, update_at, id];

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error("Erro ao editar cliente no banco de dados:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    res.json({ data: results });
  });
});

router.delete("/delete/:id", (req, res) => {
  const connection = mysql.createConnection(process.env.DATABASE_URL);
  const id = req.params.id;

  const sql = "DELETE FROM users WHERE id = ?";

  connection.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Erro ao excluir cliente do banco de dados:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    res.json({ data: results });
  });
});

module.exports = router;
