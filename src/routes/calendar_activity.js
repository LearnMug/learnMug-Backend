const express = require("express");
const router = express.Router();
const connectDB = require("../middleware/connectDB");
router.use(express.json());

router.get('/get', async (req, res) => {
  // #swagger.tags = ['Calendar Activity']
  try {
    const connection = await connectDB();

    const [result] = await connection.query('SELECT * FROM calendar_activity');
    await connection.end();

    res.json({ data: result });
  } catch (error) {
    console.error('Error in the database query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

router.get('/get/:id', async (req, res) => {
  // #swagger.tags = ['Calendar Activity']
  try {
    const connection = await connectDB();
    const id = req.params.id;

    const [result] = await connection.query("SELECT * FROM calendar_activity WHERE id = ?", [id]);
    await connection.end();

    res.json({ data: result });
  } catch (error) {
    console.error("Error in the database query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
})

router.post("/create", async (req, res) => {
  // #swagger.tags = ['Calendar Activity']
  try{
    const connection = await connectDB();
    const { responsible_id, student_id, module_id, title, description, date, month_id, year, time, link, active_flag, deleted_flag, creating_user_id } = req.body;
    const create_at = new Date()

    sql =
      "INSERT INTO calendar_activity ( responsible_id, student_id, module_id, title, description, date, month_id, year, time, link, active_flag, deleted_flag, creating_user_id, create_at ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [responsible_id, student_id, module_id, title, description, date, month_id, year, time, link, active_flag, deleted_flag, creating_user_id, create_at];

    const [result] = await connection.query(sql, values);
    await connection.end();

    res.json({ calendar_activity_id: result.insertId });
  }catch(error){
    console.error("Error while creating Calendar Activity in database:", error);
    res.status(401).json({ error: error });
  }
});

router.put("/update-calendar-activity/:id", async (req, res) => {
  // #swagger.tags = ['Calendar Activity']
  try{
    const connection = await connectDB();
    const id = req.params.id;
    const { responsible_id, student_id, module_id, title, description, date, month_id, year, time, link, active_flag, deleted_flag, updater_user_id } = req.body;
    const updatedFields = req.body;
    const update_at = new Date()

    const sql = "UPDATE calendar_activity SET ?, update_at = ? WHERE id = ?";
    const values = [updatedFields, update_at, id];

    const [result] = await connection.query(sql, values);
    await connection.end();

    res.json({ data: result });
  }catch(error){
    console.error("Error updating Calendar Activity in database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/delete-calendar-activity/:id", async (req, res) => {
  // #swagger.tags = ['Calendar Activity']
  try{
    const connection = await connectDB();
    const id = req.params.id;

    const sql = "DELETE FROM calendar_activity WHERE id = ?";

    const [result] = await connection.query(sql, [id]);
    await connection.end();

    res.json({ data: result });
  }catch(error){
    console.error("Error deleting Calendar Activity from database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get('/get-per-month', async (req, res) => {
  // #swagger.tags = ['Calendar Activity']
  try {
    const connection = await connectDB();
    const activitiesPerMonth = {};

    const [result] = await connection.query(`SELECT ca.* 
    FROM view_calendar_activity ca
    WHERE CONCAT(ca.year, LPAD(ca.month_id, 2, '0'), '01') >= DATE_FORMAT(CURDATE(), '%Y%m01')
    ORDER BY ca.year, ca.month_id;`);
    await connection.end();

    result.forEach((activity) => {
      const month = activity.month;
      if (!activitiesPerMonth[month]) {
        activitiesPerMonth[month] = [];
      }
      delete activity.month; // Removendo a chave 'month' do objeto
      activitiesPerMonth[month].push(activity);
    });

    res.json({ data: activitiesPerMonth });
  } catch (error) {
    console.error('Error in the database query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

module.exports = router;