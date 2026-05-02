'use strict';
const { SystemSetting } = require('../models');

/**
 * @swagger
 * tags:
 *   name: Settings
 *   description: Global theme and announcement bar (Master Admin managed)
 */
const SettingsController = {

  /**
   * @swagger
   * /settings/theme:
   *   get:
   *     tags: [Settings]
   *     summary: Get the current global default theme
   *     security: []
   *     responses:
   *       200:
   *         content:
   *           application/json:
   *             example: { active: "ocean" }
   */
  async getTheme(req, res) {
    try {
      const row = await SystemSetting.findOne({ where: { settingKey: 'GLOBAL_THEME' } });
      res.json(row ? row.settingValue : { active: 'ocean' });
    } catch (err) { res.status(500).json({ message: err.message }); }
  },

  /**
   * @swagger
   * /settings/theme:
   *   put:
   *     tags: [Settings]
   *     summary: Update global default theme (MASTER_ADMIN only)
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               active:
   *                 type: string
   *                 enum: [dark, light, warm, ocean, silver, ivory]
   *     responses:
   *       200: { description: Theme updated }
   */
  async updateTheme(req, res) {
    try {
      await SystemSetting.upsert({ settingKey: 'GLOBAL_THEME', settingValue: req.body });
      res.json({ message: 'Theme updated', theme: req.body });
    } catch (err) { res.status(500).json({ message: err.message }); }
  },

  /**
   * @swagger
   * /settings/announcement:
   *   get:
   *     tags: [Settings]
   *     summary: Get current announcement bar text (EN + FR)
   *     security: []
   *     responses:
   *       200:
   *         content:
   *           application/json:
   *             example: { en: "✦ Free shipping on all orders", fr: "✦ Livraison offerte" }
   */
  async getAnnouncement(req, res) {
    try {
      const row = await SystemSetting.findOne({ where: { settingKey: 'ANNOUNCEMENT' } });
      res.json(row ? row.settingValue : { en: '', fr: '' });
    } catch (err) { res.status(500).json({ message: err.message }); }
  },

  /**
   * @swagger
   * /settings/announcement:
   *   put:
   *     tags: [Settings]
   *     summary: Update announcement bar text (MASTER_ADMIN only)
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               en: { type: string }
   *               fr: { type: string }
   *     responses:
   *       200: { description: Announcement updated }
   */
  async updateAnnouncement(req, res) {
    try {
      await SystemSetting.upsert({ settingKey: 'ANNOUNCEMENT', settingValue: req.body });
      res.json({ message: 'Announcement updated' });
    } catch (err) { res.status(500).json({ message: err.message }); }
  },
};

module.exports = { SettingsController };
