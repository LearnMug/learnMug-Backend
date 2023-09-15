const express = require("express");
const mysql = require("mysql2");
const router = express.Router();
router.use(express.json());

router.get('/get-course-modules', function (req, res) {
  // #swagger.tags = ['Course Modules']
  try {
    const connection = mysql.createConnection(process.env.DATABASE_URL)
    connection.query('SELECT * FROM course_modules', (err, results) => {
      if (err) {
        console.error('Erro ao consultar o MySQL:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
        return;
      }
      res.json(results);
    });
    connection.end()
  } catch (error) {
    return console.error(`Error: ${error}`)
  }
})

router.get('/get-course-modules/:id', function (req, res) {
  // #swagger.tags = ['Course Modules']
  try {
    const connection = mysql.createConnection(process.env.DATABASE_URL);
    const id = req.params.id

    connection.query("SELECT * FROM course_modules WHERE id = ?", [id], (err, results) => {
      if (err) {
        console.error("Erro na consulta ao banco de dados:", err);
        return res.status(500).json({ error: "Erro interno do servidor" });
      }

      res.json({ data: results });
    })
  } catch (error) {
    return console.error(`Erro: ${error}`)
  }
})

router.post("/create-course-modules", function (req, res) {
  // #swagger.tags = ['Course Modules']
  const connection = mysql.createConnection(process.env.DATABASE_URL);
  const { course_id, module_id } = req.body;

  sql =
    "INSERT INTO course_modules ( course_id, module_id ) VALUES (?, ?)";
  const values = [course_id, module_id];

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error("Erro ao criar course_modules no banco de dados:", err);
      return res.status(401).json({ error: err });
    }

    res.json({ course_modules_id: results.insertId });
  });
});

router.put("/update-course-modules/:id", (req, res) => {
  // #swagger.tags = ['Course Modules']
  const connection = mysql.createConnection(process.env.DATABASE_URL);
  const id = req.params.id;
  const updatedFields = req.body;

  const sql = "UPDATE course_modules SET ? WHERE id = ?";
  const values = [updatedFields, id];

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error("Erro ao atualizar course_modules no banco de dados:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    res.json({ data: results });
  });
});

router.delete("/delete-course-modules/:id", (req, res) => {
  // #swagger.tags = ['Course Modules']
  const connection = mysql.createConnection(process.env.DATABASE_URL);
  const id = req.params.id;

  const sql = "DELETE FROM course_modules WHERE id = ?";

  connection.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Erro ao excluir course_modules do banco de dados:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    res.json({ data: results });
  });
});

module.exports = router;