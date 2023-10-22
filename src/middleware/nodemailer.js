const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail', 
  auth: {
    user: 'learnmug.payment@gmail.com',
    pass: 'dpqt vhjh wvyn ubxh',
  },
});

module.exports = transporter;