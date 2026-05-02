'use strict';
const router = require('express').Router();
const AuthController = require('../controllers/AuthController');
const { verifyToken } = require('../middleware/auth.middleware');

router.post('/register', AuthController.register);
router.post('/login',    AuthController.login);
router.get('/me',        verifyToken, AuthController.me);

module.exports = router;
