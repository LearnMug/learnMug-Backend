const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger_output.json');
const swaggerOptions = { customCssUrl: '/swagger-ui.css' };
require('dotenv').config();
const routes = require('./src/routes');
const cors = require('cors');

app.use(cors());
app.get('/', (req, res) => {/* #swagger.ignore = true */ res.redirect('/doc'); });
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));

routes(app);

app.listen(4000, () => {
  console.log("Servidor rodando");
});

module.exports = app;