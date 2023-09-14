const express = require("express");
const mysql = require("mysql2");
const router = express.Router();
router.use(express.json());

router.get('/get-course-categories', function (req, res) {
  try {
    const connection = mysql.createConnection(process.env.DATABASE_URL)
    connection.query('SELECT * FROM course_categories', (err, results) => {
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

router.get('/get-course-categories/:id', function (req, res) {
  try {
    const connection = mysql.createConnection(process.env.DATABASE_URL);
    const id = req.params.id

    connection.query("SELECT * FROM course_categories WHERE id = ?", [id], (err, results) => {
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

router.post("/create-course-categories", function (req, res) {

  const connection = mysql.createConnection(process.env.DATABASE_URL);
  const { course_id, categorie_id } = req.body;

  sql =
    "INSERT INTO course_categories ( course_id, categorie_id ) VALUES (?, ?)";
  const values = [course_id, categorie_id];

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error("Erro ao criar course_categories no banco de dados:", err);
      return res.status(401).json({ error: err });
    }

    res.json({ course_categories_id: results.insertId });
  });
});

router.put("/update-course-categories/:id", (req, res) => {

  const connection = mysql.createConnection(process.env.DATABASE_URL);
  const id = req.params.id;
  const updatedFields = req.body;

  const sql = "UPDATE course_categories SET ? WHERE id = ?";
  const values = [updatedFields, id];

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error("Erro ao atualizar course_categories no banco de dados:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    res.json({ data: results });
  });
});

router.delete("/delete-course-categories/:id", (req, res) => {
  const connection = mysql.createConnection(process.env.DATABASE_URL);
  const id = req.params.id;

  const sql = "DELETE FROM course_categories WHERE id = ?";

  connection.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Erro ao excluir course_categories do banco de dados:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    res.json({ data: results });
  });
});

module.exports = router;