const mysql = require("mysql2");

async function connectDB(req = null, res = null, next = null) {
  try {
    await mysql.connect(process.env.DATABASE_URL);
    console.log('Conectado ao banco de dados!');
    try { next(); } catch { };
    return mysql;
  } catch (error) {
    console.error(error);
    return error;
  }
}

module.exports = connectDB;