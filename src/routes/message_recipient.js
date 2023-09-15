const express = require("express");
const mysql = require("mysql2");
const router = express.Router();
router.use(express.json());

router.post("/create", function (req, res) {
  // #swagger.tags = ['Message Recipient']
  const connection = mysql.createConnection(process.env.DATABASE_URL);
  const { message_id, recipient_id } = req.body;

  sql =
    "INSERT INTO message_recipient (message_id, recipient_id) VALUES (?, ?)";
  const values = [message_id, recipient_id];

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error("Erro ao criar message_recipient no banco de dados:", err);
      return res.status(401).json({ error: err });
    }

    res.json({ message_recipient_id: results.insertId });
  });
});

router.get("/get-message-recipient", (req, res) => {
  // #swagger.tags = ['Message Recipient']
  const connection = mysql.createConnection(process.env.DATABASE_URL);

  connection.query("SELECT * FROM message_recipient", (err, results) => {
    if (err) {
      console.error("Erro na consulta ao banco de dados:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    res.json({ data: results });
  });
});

router.get("/get-message-recipient/:id", (req, res) => {
  // #swagger.tags = ['Message Recipient']
  const connection = mysql.createConnection(process.env.DATABASE_URL);
  const id = req.params.id;

  connection.query("SELECT * FROM message_recipient WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Erro na consulta ao banco de dados:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    res.json({ data: results });
  });
});

router.put("/update/:id", (req, res) => {
  // #swagger.tags = ['Message Recipient']
  const connection = mysql.createConnection(process.env.DATABASE_URL);
  const id = req.params.id;
  const updatedFields = req.body;

  const sql = "UPDATE message_recipient SET ? WHERE id = ?";
  const values = [updatedFields, id];

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error("Erro ao editar message_recipient no banco de dados:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    res.json({ data: results });
  });
});

router.delete("/delete/:id", (req, res) => {
  // #swagger.tags = ['Message Recipient']
  const connection = mysql.createConnection(process.env.DATABASE_URL);
  const id = req.params.id;

  const sql = "DELETE FROM message_recipient WHERE id = ?";

  connection.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Erro ao excluir message_recipient do banco de dados:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    res.json({ data: results });
  });
});

module.exports = router;
