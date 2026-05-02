'use strict';
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const { User, Role } = require('../models');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Register, login, and current user
 */
const AuthController = {

  /**
   * @swagger
   * /auth/register:
   *   post:
   *     tags: [Auth]
   *     summary: Register a new customer account
   *     security: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [firstName, lastName, email, password]
   *             properties:
   *               firstName: { type: string }
   *               lastName:  { type: string }
   *               email:     { type: string, format: email }
   *               password:  { type: string, minLength: 8 }
   *     responses:
   *       201: { description: User registered }
   *       400: { description: Email already exists }
   */
  async register(req, res) {
    try {
      const { firstName, lastName, email, password } = req.body;
      const exists = await User.findOne({ where: { email, companyId: req.tenant.id } });
      if (exists) return res.status(400).json({ message: 'Email already registered' });

      const customerRole = await Role.findOne({ where: { name: 'CUSTOMER' } });
      const passwordHash = await bcrypt.hash(password, 12);
      const user = await User.create({ firstName, lastName, email, passwordHash, roleId: customerRole.id, companyId: req.tenant.id });
      res.status(201).json({ message: 'Registered successfully', userId: user.id });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  /**
   * @swagger
   * /auth/login:
   *   post:
   *     tags: [Auth]
   *     summary: Login and receive JWT token
   *     security: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [email, password]
   *             properties:
   *               email:    { type: string, format: email }
   *               password: { type: string }
   *     responses:
   *       200:
   *         description: Login successful
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 token: { type: string }
   *                 user:
   *                   type: object
   *                   properties:
   *                     id: { type: string }
   *                     email: { type: string }
   *                     role: { type: string }
   *       401: { description: Invalid credentials }
   */
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email, companyId: req.tenant.id }, include: [{ model: Role, as: 'role' }] });
      if (!user) return res.status(401).json({ message: 'Invalid email or password' });

      const valid = await bcrypt.compare(password, user.passwordHash);
      if (!valid) return res.status(401).json({ message: 'Invalid email or password' });

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role.name },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      );
      res.json({ token, user: { id: user.id, email: user.email, firstName: user.firstName, role: user.role.name } });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  /**
   * @swagger
   * /auth/me:
   *   get:
   *     tags: [Auth]
   *     summary: Get current logged-in user profile
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200: { description: User profile }
   *       401: { description: Unauthorized }
   */
  async me(req, res) {
    try {
      const user = await User.findOne({
        where: { id: req.user.id, companyId: req.tenant.id },
        attributes: { exclude: ['passwordHash'] },
        include: [{ model: Role, as: 'role' }]
      });
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = AuthController;
