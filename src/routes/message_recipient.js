const express = require("express");
const router = express.Router();
const connectDB = require("../middleware/connectDB");
router.use(express.json());

router.post("/create", async (req, res) => {
  // #swagger.tags = ['Message Recipient']
  try{
    const connection = await connectDB();
    const { message_id, recipient_id } = req.body;

    sql =
      "INSERT INTO message_recipient (message_id, recipient_id) VALUES (?, ?)";
    const values = [message_id, recipient_id];

    const [result] = await connection.query(sql, values);
    await connection.end();
    
    res.json({ message_recipient_id: result.insertId });
  }catch(error){
    console.error("Error while creating message recipient in database:", error);
    res.status(401).json({ error: "Internal server error" });
  }
});

router.get("/get", async (req, res) => {
  // #swagger.tags = ['Message Recipient']
  try{
    const connection = await connectDB();

    const [result] = await connection.query("SELECT * FROM message_recipient");
    await connection.end();

    res.json({ data: result });
  }catch(error){
    console.error("Error in the database query:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/get/:id", async (req, res) => {
  // #swagger.tags = ['Message Recipient']
  try{
    const connection = await connectDB();
    const id = req.params.id;

    const [result] = await connection.query("SELECT * FROM message_recipient WHERE id = ?", [id]);
    await connection.end();

    res.json({ data: result });
  }catch(error){
    console.error("Error in the database query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/update/:id", async (req, res) => {
  // #swagger.tags = ['Message Recipient']
  try{
    const connection = await connectDB();
    const id = req.params.id;
    const { message_id, recipient_id } = req.body;
    const updatedFields = req.body;

    const sql = "UPDATE message_recipient SET ? WHERE id = ?";
    const values = [updatedFields, id];

    const [result] = await connection.query(sql, values);
    await connection.end();
    
    res.json({ data: result });
  }catch(error){
    console.error("Error while editing message recipient in database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  // #swagger.tags = ['Message Recipient']
  try{
    const connection = await connectDB();
    const id = req.params.id;

    const sql = "DELETE FROM message_recipient WHERE id = ?";

    const [result] = await connection.query(sql, [id]);
    await connection.end();

    res.json({ data: result });
  }catch(error){
    console.error("Error deleting message recipient from database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/all-message-of-user/:id", async (req, res) => {
  // #swagger.tags = ['Message Recipient']
  try{
    const connection = await connectDB();
    const id = req.params.id;

    const [result] = await connection.query("SELECT * FROM view_messages_user WHERE recipient_id = ? ORDER BY create_at DESC", [id]);
    await connection.end();

    res.json({ data: result });
  }catch(error){
    console.error("Error in the database query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/message-of-user/:id", async (req, res) => {
  // #swagger.tags = ['Message Recipient']
  try{
    const connection = await connectDB();
    const id = req.params.id;

    const [result] = await connection.query("SELECT * FROM view_messages_user WHERE message_id = ?", [id]);
    await connection.end();

    res.json({ data: result });
  }catch(error){
    console.error("Error in the database query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
