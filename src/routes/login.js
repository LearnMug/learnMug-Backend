const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const connectDB = require("../middleware/connectDB");

router.use(express.json());

const secretKey = process.env.JWT_SECRET;

router.post("/", async (req, res) => {
  // #swagger.tags = ['Login']
  try {
    const connection = await connectDB();
    const { email, password } = req.body;

    const [result] = await connection.query(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password]
    );
    await connection.end();

    if (result.length === 1) {
      const user = result[0];
      const token = jwt.sign({ user }, secretKey, { expiresIn: "1h" });
      res.header("x-auth-token", token);
      res.status(200).json({
        status: "OK",
        statusMensagem: "User authenticated with success",
        resposta: { "token": token, "user_id": result[0].id , "name":result[0].name, "email": result[0].email, "phone_number": result[0].phone_number, "preferences": result[0].preferences},
      });
    } else {
      res.status(401).json({ message: "Invalid user or password" });
    }
  } catch (error) {
    console.error("Error in the database query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
