// swagger.js

const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'LearnMug',
      version: '1.0.0',
      description: 'LearnMug Documentation',
    },
    servers: [
      {
        url: 'http://localhost:4000', // Altere a porta se necessário
      },
    ],
  },
  apis: ['./routes/*.js'], // Caminho para seus arquivos de rota
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
