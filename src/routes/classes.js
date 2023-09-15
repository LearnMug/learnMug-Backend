const express = require("express");
const mysql = require("mysql2");
const router = express.Router();
router.use(express.json());

router.get('/get-classes', function (req, res) {
  try {
    const connection = mysql.createConnection(process.env.DATABASE_URL)
    connection.query('SELECT * FROM classes', (err, results) => {
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

router.get('/get-classes/:id', function (req, res) {
  try {
    const connection = mysql.createConnection(process.env.DATABASE_URL);
    const id = req.params.id

    connection.query("SELECT * FROM classes WHERE id = ?", [id], (err, results) => {
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

router.post("/create-classes", function (req, res) {

  const connection = mysql.createConnection(process.env.DATABASE_URL);
  const { name, videos, active_flag, deleted_flag, creating_user_id, updater_user_id } = req.body;
  const create_at = new Date()

  sql =
    "INSERT INTO classes ( name, videos, active_flag, deleted_flag, creating_user_id, create_at, updater_user_id  ) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const values = [name, videos, active_flag, deleted_flag, creating_user_id, create_at, updater_user_id];

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error("Erro ao criar classes no banco de dados:", err);
      return res.status(401).json({ error: err });
    }

    res.json({ classes_id: results.insertId });
  });
});

router.put("/update-classes/:id", (req, res) => {

  const connection = mysql.createConnection(process.env.DATABASE_URL);
  const id = req.params.id;
  const updatedFields = req.body;
  const update_at = new Date()

  const sql = "UPDATE classes SET ?, update_at = ? WHERE id = ?";
  const values = [updatedFields, update_at, id];

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error("Erro ao atualizar classes no banco de dados:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    res.json({ data: results });
  });
});

router.delete("/delete-classes/:id", (req, res) => {
  const connection = mysql.createConnection(process.env.DATABASE_URL);
  const id = req.params.id;

  const sql = "DELETE FROM classes WHERE id = ?";

  connection.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Erro ao excluir classes do banco de dados:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    res.json({ data: results });
  });
});

module.exports = router;