const express = require("express");
const mysql = require("mysql2");
const router = express.Router();


router.get('/obter', function (req, res){
  try{
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
  } catch(error) {
    console.log(error)
  }
});

module.exports = router;