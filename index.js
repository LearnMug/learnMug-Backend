const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger_output.json');
const swaggerOptions = { customCssUrl: '/swagger-ui.css' };
require('dotenv').config();
const routes = require('./src/routes');


app.get('/', (req, res) => {/* #swagger.ignore = true */ res.redirect('/doc'); });
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));

routes(app);

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}

module.exports = app;