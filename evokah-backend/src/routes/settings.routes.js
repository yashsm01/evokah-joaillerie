'use strict';
const router = require('express').Router();
const { SettingsController } = require('../controllers/SettingsController');
const { verifyToken } = require('../middleware/auth.middleware');
const { authorizeRoles } = require('../middleware/role.middleware');

const adminGuard = [verifyToken, authorizeRoles('MASTER_ADMIN')];

// ── Theme ──────────────────────────────────────────────────────
router.get('/theme',        SettingsController.getTheme);
router.put('/theme',        ...adminGuard, SettingsController.updateTheme);

// ── Announcement bar ───────────────────────────────────────────
router.get('/announcement', SettingsController.getAnnouncement);
router.put('/announcement', ...adminGuard, SettingsController.updateAnnouncement);

module.exports = router;
