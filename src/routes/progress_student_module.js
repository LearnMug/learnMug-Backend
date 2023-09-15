const express = require("express");
const mysql = require("mysql2");
const router = express.Router();
router.use(express.json());

router.post("/create", function (req, res) {
  // #swagger.tags = ['Progress Student Modules']
  const connection = mysql.createConnection(process.env.DATABASE_URL);
  const { student_id, module_id, progress } = req.body;

  sql =
    "INSERT INTO progress_student_module (student_id, module_id, progress) VALUES (?, ?, ?)";
  const values = [student_id, module_id, progress];

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error("Erro ao criar progress_student_module no banco de dados:", err);
      return res.status(401).json({ error: err });
    }

    res.json({ progress_student_module_id: results.insertId });
  });
});

router.get("/get-progress-student-module", (req, res) => {
  // #swagger.tags = ['Progress Student Modules']
  const connection = mysql.createConnection(process.env.DATABASE_URL);

  connection.query("SELECT * FROM progress_student_module", (err, results) => {
    if (err) {
      console.error("Erro na consulta ao banco de dados:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    res.json({ data: results });
  });
});

router.get("/get-progress-student-module/:id", (req, res) => {
  // #swagger.tags = ['Progress Student Modules']
  const connection = mysql.createConnection(process.env.DATABASE_URL);
  const id = req.params.id;

  connection.query("SELECT * FROM progress_student_module WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Erro na consulta ao banco de dados:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    res.json({ data: results });
  });
});

router.put("/update/:id", (req, res) => {
  // #swagger.tags = ['Progress Student Modules']
  const connection = mysql.createConnection(process.env.DATABASE_URL);
  const id = req.params.id;
  const updatedFields = req.body;

  const sql = "UPDATE progress_student_module SET ? WHERE id = ?";
  const values = [updatedFields, id];

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error("Erro ao editar progress_student_module no banco de dados:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    res.json({ data: results });
  });
});

router.delete("/delete/:id", (req, res) => {
  // #swagger.tags = ['Progress Student Modules']
  const connection = mysql.createConnection(process.env.DATABASE_URL);
  const id = req.params.id;

  const sql = "DELETE FROM progress_student_module WHERE id = ?";

  connection.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Erro ao excluir progress_student_module do banco de dados:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    res.json({ data: results });
  });
});

module.exports = router;
