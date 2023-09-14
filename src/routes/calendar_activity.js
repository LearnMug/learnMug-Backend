const express = require("express");
const mysql = require("mysql2");
const router = express.Router();
router.use(express.json());

router.get('/get-calendar-activity', function (req, res) {
  try {
    const connection = mysql.createConnection(process.env.DATABASE_URL)
    connection.query('SELECT * FROM calendar_activity', (err, results) => {
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

router.get('/get-calendar-activity/:id', function (req, res) {
  try {
    const connection = mysql.createConnection(process.env.DATABASE_URL);
    const id = req.params.id

    connection.query("SELECT * FROM calendar_activity WHERE id = ?", [id], (err, results) => {
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

router.post("/create-calendar-activity", function (req, res) {

  const connection = mysql.createConnection(process.env.DATABASE_URL);
  const { responsible_id, student_id, module_id, title, description, date, time, link, active_flag, deleted_flag, creating_user_id } = req.body;
  const create_at = new Date()

  sql =
    "INSERT INTO calendar_activity ( responsible_id, student_id, module_id, title, description, date, time, link, active_flag, deleted_flag, creating_user_id, create_at ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [responsible_id, student_id, module_id, title, description, date, time, link, active_flag, deleted_flag, creating_user_id, create_at];

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error("Erro ao criar calendar_activity no banco de dados:", err);
      return res.status(401).json({ error: err });
    }

    res.json({ calendar_activity_id: results.insertId });
  });
});

router.put("/update-calendar-activity/:id", (req, res) => {

  const connection = mysql.createConnection(process.env.DATABASE_URL);
  const id = req.params.id;
  const updatedFields = req.body;
  const update_at = new Date()

  const sql = "UPDATE calendar_activity SET ?, update_at = ? WHERE id = ?";
  const values = [updatedFields, update_at, id];

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error("Erro ao atualizar calendar_activity no banco de dados:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    res.json({ data: results });
  });
});

router.delete("/delete-calendar-activity/:id", (req, res) => {
  const connection = mysql.createConnection(process.env.DATABASE_URL);
  const id = req.params.id;

  const sql = "DELETE FROM calendar_activity WHERE id = ?";

  connection.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Erro ao excluir calendar_activity do banco de dados:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    res.json({ data: results });
  });
});

module.exports = router;