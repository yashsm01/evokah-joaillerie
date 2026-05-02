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

    // Use sync() without { alter: true } to prevent constraint drop errors on nodemon restarts.
    // If schema changes are needed, run the seeder or use migrations.
    await sequelize.sync();
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
