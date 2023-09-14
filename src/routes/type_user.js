const express = require("express");
const mysql = require("mysql2");
const router = express.Router();
router.use(express.json());


router.get('/get-type-user', function (req, res) {
  try {
    const connection = mysql.createConnection(process.env.DATABASE_URL)
    connection.query('SELECT * FROM view_type_user', (err, results) => {
      if (err) {
        console.error('Erro ao consultar o MySQL:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
        return;
      }
      res.json(results);
    });
    connection.end()
  } catch (error) {
    console.log(error)
  }
});

router.get('/get-type-user/:id', function (req, res) {
  try {
    const connection = mysql.createConnection(process.env.DATABASE_URL);
    const id = req.params.id

    connection.query("SELECT * FROM types_user WHERE id = ?", [id], (err, results) => {
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

router.post("/create-type-user", function (req, res) {

  const connection = mysql.createConnection(process.env.DATABASE_URL);
  const { description } = req.body;

  sql =
    "INSERT INTO types_user ( description ) VALUES (?)";
  const values = [description];

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error("Erro ao criar type_user no banco de dados:", err);
      return res.status(401).json({ error: err });
    }

    res.json({ cliente_id: results.insertId });
  });
});

router.put("/update-type-user/:id", (req, res) => {

  const connection = mysql.createConnection(process.env.DATABASE_URL);
  const id = req.params.id;
  const updatedFields = req.body;

  const sql = "UPDATE types_user SET ? WHERE id = ?";
  const values = [updatedFields, id];

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error("Erro ao atualizar types_user no banco de dados:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    res.json({ data: results });
  });
});

router.delete("/delete-type-user/:id", (req, res) => {
  const connection = mysql.createConnection(process.env.DATABASE_URL);
  const id = req.params.id;

  const sql = "DELETE FROM types_user WHERE id = ?";

  connection.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Erro ao excluir types_user do banco de dados:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    res.json({ data: results });
  });
});

module.exports = router;