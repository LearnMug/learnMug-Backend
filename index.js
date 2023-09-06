const express = require("express");
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger'); // Importe o arquivo de configuração do Swagger

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.listen(4000, () => {
    console.log("Servidor rodando");
});