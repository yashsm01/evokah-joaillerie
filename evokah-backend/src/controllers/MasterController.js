'use strict';
const { Collection, Category, Style, Shape, Metal, PriceGroup, ProductType } = require('../models');

/**
 * @swagger
 * tags:
 *   name: Masters
 *   description: Dynamic taxonomy data (filters, header nav)
 */
const MasterController = {

  /**
   * @swagger
   * /masters/header:
   *   get:
   *     tags: [Masters]
   *     summary: Get structured nav tree for header mega menu
   *     security: []
   *     responses:
   *       200:
   *         description: Full dynamic mega-menu structure per collection
   */
  async getHeader(req, res) {
    try {
      const cId = req.tenant.id;
      const collections = await Collection.findAll({
        where: { isActive: true, companyId: cId },
        order: [['sortOrder', 'ASC']],
        include: [{ model: Category, as: 'categories', where: { isActive: true, companyId: cId }, required: false }],
      });
      const styles  = await Style.findAll({ where: { isActive: true, companyId: cId } });
      const shapes  = await Shape.findAll({ where: { isActive: true, companyId: cId } });
      const metals  = await Metal.findAll({ where: { isActive: true, companyId: cId } });
      const types   = await ProductType.findAll({ where: { isActive: true, companyId: cId } });

      res.json({ collections, styles, shapes, metals, types });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  /**
   * @swagger
   * /masters/filters:
   *   get:
   *     tags: [Masters]
   *     summary: Get filter options for a specific collection
   *     security: []
   *     parameters:
   *       - in: query
   *         name: collection
   *         schema: { type: string }
   *     responses:
   *       200:
   *         description: Filter arrays (styles, metals, shapes, priceGroups)
   */
  async getFilters(req, res) {
    try {
      const cId = req.tenant.id;
      const [styles, metals, shapes, priceGroups] = await Promise.all([
        Style.findAll({ where: { isActive: true, companyId: cId } }),
        Metal.findAll({ where: { isActive: true, companyId: cId } }),
        Shape.findAll({ where: { isActive: true, companyId: cId } }),
        PriceGroup.findAll({ where: { companyId: cId }, order: [['minPrice', 'ASC']] }),
      ]);
      res.json({ styles, metals, shapes, priceGroups });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = MasterController;
