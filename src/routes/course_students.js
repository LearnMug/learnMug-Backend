const express = require("express");
const mysql = require("mysql2");
const router = express.Router();
router.use(express.json());

router.post("/create", function (req, res) {
  const connection = mysql.createConnection(process.env.DATABASE_URL);
  const { course_id, student_id, progress } = req.body;

  sql =
    "INSERT INTO course_students (course_id, student_id, progress) VALUES (?, ?, ?)";
  const values = [course_id, student_id, progress];

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error("Erro ao criar course_students no banco de dados:", err);
      return res.status(401).json({ error: err });
    }

    res.json({ course_students_id: results.insertId });
  });
});

router.get("/get-course-students", (req, res) => {
  const connection = mysql.createConnection(process.env.DATABASE_URL);

  connection.query("SELECT * FROM course_students", (err, results) => {
    if (err) {
      console.error("Erro na consulta ao banco de dados:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    res.json({ data: results });
  });
});

router.get("/get-course-students/:id", (req, res) => {
  const connection = mysql.createConnection(process.env.DATABASE_URL);
  const id = req.params.id;

  connection.query("SELECT * FROM course_students WHERE id = ?", [id], (err, results) => {
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

  const sql = "UPDATE course_students SET ? WHERE id = ?";
  const values = [updatedFields, id];

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error("Erro ao editar curso estudante no banco de dados:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    res.json({ data: results });
  });
});

router.delete("/delete/:id", (req, res) => {
  const connection = mysql.createConnection(process.env.DATABASE_URL);
  const id = req.params.id;

  const sql = "DELETE FROM course_students WHERE id = ?";

  connection.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Erro ao excluir curso estudante do banco de dados:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    res.json({ data: results });
  });
});

module.exports = router;
