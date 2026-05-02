'use strict';
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Evokah Joaillerie API',
      version: '1.0.0',
      description: 'REST API for Evokah Joaillerie — products, filters, media, cart, wishlist, settings.',
    },
    servers: [{ url: `http://localhost:${process.env.PORT || 4000}/api` }],
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js', './src/models/**/*.js'],
};

module.exports = swaggerJsdoc(options);
