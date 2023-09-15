const express = require("express");
const mysql = require("mysql2");
const router = express.Router();
router.use(express.json());

router.post("/create", function (req, res) {
  // #swagger.tags = ['Courses']
  const connection = mysql.createConnection(process.env.DATABASE_URL);
  const { name, description, cover_img, ratings, number_of_ratings, course_syllabus, creating_user_id } = req.body;
  const create_at = new Date();

  sql =
    "INSERT INTO courses (name, description, cover_img, ratings, number_of_ratings, course_syllabus, creating_user_id, create_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [name, description, cover_img, ratings, number_of_ratings, course_syllabus, creating_user_id, create_at];

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error("Erro ao criar course no banco de dados:", err);
      return res.status(401).json({ error: err });
    }

    res.json({ course_id: results.insertId });
  });
});

router.get("/get-courses", (req, res) => {
  // #swagger.tags = ['Courses']
  const connection = mysql.createConnection(process.env.DATABASE_URL);

  connection.query("SELECT * FROM courses", (err, results) => {
    if (err) {
      console.error("Erro na consulta ao banco de dados:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    res.json({ data: results });
  });
});

router.get("/get-courses/:id", (req, res) => {
  // #swagger.tags = ['Courses']
  const connection = mysql.createConnection(process.env.DATABASE_URL);
  const id = req.params.id;

  connection.query("SELECT * FROM courses WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Erro na consulta ao banco de dados:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    res.json({ data: results });
  });
});

router.put("/update/:id", (req, res) => {
  // #swagger.tags = ['Courses']
  const connection = mysql.createConnection(process.env.DATABASE_URL);
  const id = req.params.id;
  const updatedFields = req.body;
  const update_at = new Date();

  const sql = "UPDATE courses SET ? , update_at = ? WHERE id = ?";
  const values = [updatedFields, update_at, id];

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error("Erro ao editar course no banco de dados:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    res.json({ data: results });
  });
});

router.delete("/delete/:id", (req, res) => {
  // #swagger.tags = ['Courses']
  const connection = mysql.createConnection(process.env.DATABASE_URL);
  const id = req.params.id;

  const sql = "DELETE FROM courses WHERE id = ?";

  connection.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Erro ao excluir course do banco de dados:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    res.json({ data: results });
  });
});

module.exports = router;
