const express = require("express");
const router = express.Router();
const connectDB = require("../middleware/connectDB");
const axios = require("axios");
router.use(express.json());

const BASE_URL = "http://localhost:4000/messages";
const BASE_URL_USER = "http://localhost:4000/message-recipient";

router.post("/send-message", async (req, res) => {
  // #swagger.tags = ['Messages']
  try {
    const connection = await connectDB();
    const { subject, message, creating_user_id, recipient_id } = req.body;

    const dadosMessage = {
      subject: subject,
      message: message,
      creating_user_id: creating_user_id
    };

    const createMessage = await axios.post(`${BASE_URL}/create`, dadosMessage);

    if (createMessage.status === 200) {
      const dadosUser = {
        message_id: createMessage.data.message_id,
        recipient_id: recipient_id,
      };

      const createRecipientMessage = await axios.post(`${BASE_URL_USER}/create`, dadosUser);
    }

    await connection.end();

    res.json({ message_id: createMessage.data.message_id });
  } catch (error) {
    console.error("Error while send message:", error);
    return res.status(401).json({ error: "Internal server error" });
  }
});

router.post("/create", async (req, res) => {
  // #swagger.tags = ['Messages']
  try {
    const connection = await connectDB();
    const { subject, message, creating_user_id } = req.body;
    const create_at = new Date();

    sql =
      "INSERT INTO messages (subject, message, creating_user_id, create_at) VALUES (?, ?, ?, ?)";
    const values = [subject, message, creating_user_id, create_at];

    const [result] = await connection.query(sql, values);
    await connection.end();

    res.json({ message_id: result.insertId });
  } catch (error) {
    console.error("Error while creating message in database:", error);
    return res.status(401).json({ error: "Internal server error" });
  }
});

router.get("/get", async (req, res) => {
  // #swagger.tags = ['Messages']
  try {
    const connection = await connectDB();

    const [result] = await connection.query("SELECT * FROM messages");
    await connection.end();

    res.json({ data: result });
  } catch (error) {
    console.error("Error in the database query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/get/:id", async (req, res) => {
  // #swagger.tags = ['Messages']
  try {
    const connection = await connectDB();
    const id = req.params.id;

    const [result] = await connection.query(
      "SELECT * FROM messages WHERE id = ?",
      [id]
    );
    await connection.end();

    res.json({ data: result });
  } catch (error) {
    console.error("Error in the database query:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/update/:id", async (req, res) => {
  // #swagger.tags = ['Messages']
  try {
    const connection = await connectDB();
    const id = req.params.id;
    const { subject, message, creating_user_id } = req.body;
    const updatedFields = req.body;

    const sql = "UPDATE messages SET ? WHERE id = ?";
    const values = [updatedFields, id];

    const [result] = await connection.query(sql, values);
    await connection.end();

    res.json({ data: result });
  } catch (error) {
    console.error("Error while editing menssagem in database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  // #swagger.tags = ['Messages']
  try {
    const connection = await connectDB();
    const id = req.params.id;

    const sql = "DELETE FROM messages WHERE id = ?";

    const [result] = await connection.query(sql, [id]);
    await connection.end();

    res.json({ data: result });
  } catch (error) {
    console.error("Error deleting menssagem from database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/professors_of_student/:id", async (req, res) => {
  // #swagger.tags = ['Messages']
  try {
    const connection = await connectDB();
    const id = req.params.id;

    const [result] = await connection.query(
      "SELECT * FROM view_professors_of_student WHERE student_id = ?",
      [id]
    );
    await connection.end();

    res.json({ data: result });
  } catch (error) {
    console.error("Error in the database query:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
