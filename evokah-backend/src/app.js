'use strict';
require('dotenv').config();
const express         = require('express');
const cors            = require('cors');
const morgan          = require('morgan');
const swaggerUi       = require('swagger-ui-express');
const swaggerSpec     = require('./config/swagger');

// ── Routes ─────────────────────────────────────────────────────
const authRoutes     = require('./routes/auth.routes');
const productRoutes  = require('./routes/product.routes');
const masterRoutes   = require('./routes/master.routes');
const mediaRoutes    = require('./routes/media.routes');
const settingsRoutes = require('./routes/settings.routes');
const cartRoutes     = require('./routes/cart.routes');
const wishlistRoutes = require('./routes/wishlist.routes');
const contentRoutes  = require('./routes/content.routes');

const app = express();

// ── Middleware ─────────────────────────────────────────────────
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// ── Swagger UI — http://localhost:4000/api/docs ────────────────
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customSiteTitle: 'Evokah API Docs',
  customCss: '.swagger-ui .topbar { background-color: #1a0a0e; }',
}));

// JSON spec endpoint
app.get('/api/docs.json', (req, res) => res.json(swaggerSpec));

// ── API Routes ─────────────────────────────────────────────────
app.use('/api/auth',     authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/masters',  masterRoutes);
app.use('/api/media',    mediaRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/cart',     cartRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/content',  contentRoutes);

// ── Health Check ───────────────────────────────────────────────
app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date() }));

// ── 404 ────────────────────────────────────────────────────────
app.use((req, res) => res.status(404).json({ message: `Route ${req.path} not found` }));

// ── Global Error Handler ───────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

module.exports = app;
