'use strict';
const { Review, FaqItem, StoryContent, Translation, SystemSetting } = require('../models');

/**
 * @swagger
 * tags:
 *   name: Content
 *   description: Story, FAQ, Reviews — public CMS content
 */
const ContentController = {

  /**
   * @swagger
   * /content/story:
   *   get:
   *     tags: [Content]
   *     summary: Get brand story content (milestones, stats, values)
   *     security: []
   *     responses:
   *       200:
   *         description: Story sections grouped by type
   *         content:
   *           application/json:
   *             example:
   *               milestones: [{ year: "2015", title: "Founded in Surat", desc: "…" }]
   *               stats: [{ number: "4,000+", label: "Bespoke Pieces Crafted" }]
   *               values: [{ icon: "✦", title: "Intention", desc: "…" }]
   */
  async getStory(req, res) {
    try {
      const all = await StoryContent.findAll({ order: [['sortOrder', 'ASC']] });
      const grouped = { milestones: [], stats: [], values: [] };
      all.forEach(item => {
        if (grouped[item.type + 's']) grouped[item.type + 's'].push(item);
      });
      res.json(grouped);
    } catch (err) { res.status(500).json({ message: err.message }); }
  },

  /** PUT /content/story — MASTER_ADMIN */
  async upsertStoryItem(req, res) {
    try {
      const item = req.body.id
        ? await StoryContent.upsert(req.body)
        : await StoryContent.create(req.body);
      res.json({ message: 'Story item saved', item });
    } catch (err) { res.status(400).json({ message: err.message }); }
  },

  /**
   * @swagger
   * /content/faq:
   *   get:
   *     tags: [Content]
   *     summary: Get FAQ items, optionally filtered by collection
   *     security: []
   *     parameters:
   *       - in: query
   *         name: collection
   *         schema: { type: string }
   *         description: engagement | wedding
   *     responses:
   *       200: { description: Array of FAQ items }
   */
  async getFaq(req, res) {
    try {
      const where = req.query.collection ? { collectionSlug: req.query.collection } : {};
      res.json(await FaqItem.findAll({ where, order: [['sortOrder', 'ASC']] }));
    } catch (err) { res.status(500).json({ message: err.message }); }
  },

  /**
   * @swagger
   * /content/reviews:
   *   get:
   *     tags: [Content]
   *     summary: Get customer reviews
   *     security: []
   *     parameters:
   *       - in: query
   *         name: collection
   *         schema: { type: string }
   *     responses:
   *       200: { description: Array of reviews }
   */
  async getReviews(req, res) {
    try {
      const where = req.query.collection ? { collectionSlug: req.query.collection } : {};
      res.json(await Review.findAll({ where, order: [['featured', 'DESC']] }));
    } catch (err) { res.status(500).json({ message: err.message }); }
  },

  /** POST /content/reviews — MASTER_ADMIN */
  async createReview(req, res) {
    try {
      const review = await Review.create(req.body);
      res.status(201).json(review);
    } catch (err) { res.status(400).json({ message: err.message }); }
  },

  /**
   * @swagger
   * /content/translations:
   *   get:
   *     tags: [Content]
   *     summary: Get all translations grouped by lang (en + fr)
   *     security: []
   *     responses:
   *       200:
   *         description: Translation map
   *         content:
   *           application/json:
   *             example:
   *               en: { nav_engagement: "Engagement", nav_wedding: "Wedding" }
   *               fr: { nav_engagement: "Fiançailles", nav_wedding: "Mariage" }
   */
  async getTranslations(req, res) {
    try {
      const rows = await Translation.findAll();
      const result = { en: {}, fr: {} };
      rows.forEach(r => { result[r.lang][r.key] = r.value; });
      res.json(result);
    } catch (err) { res.status(500).json({ message: err.message }); }
  },

  /** PUT /content/translations — MASTER_ADMIN */
  async updateTranslation(req, res) {
    try {
      const { lang, key, value } = req.body;
      await Translation.upsert({ lang, key, value });
      res.json({ message: 'Translation updated' });
    } catch (err) { res.status(400).json({ message: err.message }); }
  },
};

module.exports = ContentController;
