'use strict';
require('dotenv').config();
const app      = require('./src/app');
const sequelize = require('./src/config/database');

// Import models to register all associations
require('./src/models/index');

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log('✅  PostgreSQL connected');

    // sync({ alter: true }) updates tables to match models without dropping data
    await sequelize.sync({ alter: true });
    console.log('✅  Database tables synced');

    app.listen(PORT, () => {
      console.log(`🚀  Evokah API running at http://localhost:${PORT}`);
      console.log(`📖  Swagger docs   at http://localhost:${PORT}/api/docs`);
    });
  } catch (err) {
    console.error('❌  Startup error:', err);
    process.exit(1);
  }
}

start();
