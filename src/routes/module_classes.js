const express = require("express");
const mysql = require("mysql2");
const router = express.Router();
router.use(express.json());

router.get('/get-module-classes', function (req, res) {
  try {
    const connection = mysql.createConnection(process.env.DATABASE_URL)
    connection.query('SELECT * FROM module_classes', (err, results) => {
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

router.get('/get-module-classes/:id', function (req, res) {
  try {
    const connection = mysql.createConnection(process.env.DATABASE_URL);
    const id = req.params.id

    connection.query("SELECT * FROM module_classes WHERE id = ?", [id], (err, results) => {
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

router.post("/create-module-classes", function (req, res) {

  const connection = mysql.createConnection(process.env.DATABASE_URL);
  const { module_id, classe_id } = req.body;
  sql =
    "INSERT INTO module_classes ( module_id, classe_id  ) VALUES (?, ?)";
  const values = [module_id, classe_id];

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error("Erro ao criar module_classes no banco de dados:", err);
      return res.status(401).json({ error: err });
    }

    res.json({ module_classes_id: results.insertId });
  });
});

router.put("/update-module-classes/:id", (req, res) => {

  const connection = mysql.createConnection(process.env.DATABASE_URL);
  const id = req.params.id;
  const updatedFields = req.body;

  const sql = "UPDATE module_classes SET ? WHERE id = ?";
  const values = [updatedFields, id];

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error("Erro ao atualizar module_classes no banco de dados:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    res.json({ data: results });
  });
});

router.delete("/delete-module-classes/:id", (req, res) => {
  const connection = mysql.createConnection(process.env.DATABASE_URL);
  const id = req.params.id;

  const sql = "DELETE FROM module_classes WHERE id = ?";

  connection.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Erro ao excluir module_classes do banco de dados:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    res.json({ data: results });
  });
});

module.exports = router;