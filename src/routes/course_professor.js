const express = require("express");
const mysql = require("mysql2");
const router = express.Router();
router.use(express.json());

router.post("/create", function (req, res) {
  const connection = mysql.createConnection(process.env.DATABASE_URL);
  const { course_id, professor_id } = req.body;

  sql =
    "INSERT INTO course_professor (course_id, professor_id) VALUES (?, ?)";
  const values = [course_id, professor_id];

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error("Erro ao criar course_professor no banco de dados:", err);
      return res.status(401).json({ error: err });
    }

    res.json({ course_professor_id: results.insertId });
  });
});

router.get("/get-course-professor", (req, res) => {
  const connection = mysql.createConnection(process.env.DATABASE_URL);

  connection.query("SELECT * FROM course_professor", (err, results) => {
    if (err) {
      console.error("Erro na consulta ao banco de dados:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    res.json({ data: results });
  });
});

router.get("/get-course-professor/:id", (req, res) => {
  const connection = mysql.createConnection(process.env.DATABASE_URL);
  const id = req.params.id;

  connection.query("SELECT * FROM course_professor WHERE id = ?", [id], (err, results) => {
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

  const sql = "UPDATE course_professor SET ? WHERE id = ?";
  const values = [updatedFields, id];

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error("Erro ao editar curso professor no banco de dados:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    res.json({ data: results });
  });
});

router.delete("/delete/:id", (req, res) => {
  const connection = mysql.createConnection(process.env.DATABASE_URL);
  const id = req.params.id;

  const sql = "DELETE FROM course_professor WHERE id = ?";

  connection.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Erro ao excluir curso professor do banco de dados:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    res.json({ data: results });
  });
});

module.exports = router;
