const express = require('express');
const router = express.Router();
const transporter = require('../middleware/nodemailer');

router.post('/', async (req, res) => {
  // #swagger.tags = ['Send Mail']
  const { destinatario, assunto, corpo } = req.body;

  const mailOptions = {
    from: 'learnmug.payment@gmail.com',
    to: destinatario,
    subject: assunto,
    text: corpo,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'E-mail enviado com sucesso' });
  } catch (error) {
    console.error('Erro ao enviar o e-mail:', error);
    res.status(500).json({ success: false, message: 'Erro ao enviar o e-mail', error: error.message });
  }
});

module.exports = router;
