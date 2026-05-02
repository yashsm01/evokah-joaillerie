'use strict';
const { Op } = require('sequelize');
const { Product, ProductMedia, Collection, ProductType, Category, Style, Metal, Shape, PriceGroup } = require('../models');

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product catalog
 */
const ProductController = {

  /**
   * @swagger
   * /products:
   *   get:
   *     tags: [Products]
   *     summary: Get all products with optional filters
   *     security: []
   *     parameters:
   *       - in: query
   *         name: collection
   *         schema: { type: string }
   *         description: engagement | wedding | all
   *       - in: query
   *         name: type
   *         schema: { type: string }
   *         description: ring | necklace | earring | bracelet
   *       - in: query
   *         name: style
   *         schema: { type: string }
   *       - in: query
   *         name: metal
   *         schema: { type: string }
   *       - in: query
   *         name: priceGroup
   *         schema: { type: string }
   *       - in: query
   *         name: sort
   *         schema: { type: string, enum: [featured, price-asc, price-desc, name-asc] }
   *     responses:
   *       200:
   *         description: Array of products
   */
  async getAll(req, res) {
    try {
      const { collection, type, style, metal, priceGroup, sort } = req.query;
      const where = { isActive: true, companyId: req.tenant.id };
      const include = [
        { model: Collection,  as: 'collection' },
        { model: ProductType, as: 'type' },
        { model: Category,    as: 'category' },
        { model: Style,       as: 'style' },
        { model: PriceGroup,  as: 'priceGroup' },
        { model: Metal,       as: 'metals', through: { attributes: [] } },
        { model: Shape,       as: 'shapes', through: { attributes: [] } },
        { model: ProductMedia, as: 'media', where: { isPrimary: true }, required: false },
      ];

      // Dynamic filter on associations
      if (collection) include[0].where = { slug: collection };
      if (type)       include[1].where = { slug: type };
      if (style)      include[3].where = { slug: style };
      if (priceGroup) include[4].where = { slug: priceGroup };
      if (metal) {
        include[5].required = true;
        include[5].where = { code: metal };
      }

      let order = [['createdAt', 'DESC']];
      if (sort === 'price-asc')  order = [['basePrice', 'ASC']];
      if (sort === 'price-desc') order = [['basePrice', 'DESC']];
      if (sort === 'name-asc')   order = [['name', 'ASC']];

      const products = await Product.findAll({ where, include, order });
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  /**
   * @swagger
   * /products/{slug}:
   *   get:
   *     tags: [Products]
   *     summary: Get single product by slug
   *     security: []
   *     parameters:
   *       - in: path
   *         name: slug
   *         required: true
   *         schema: { type: string }
   *     responses:
   *       200: { description: Full product detail with media, metals, shapes }
   *       404: { description: Product not found }
   */
  async getBySlug(req, res) {
    try {
      const product = await Product.findOne({
        where: { slug: req.params.slug, isActive: true, companyId: req.tenant.id },
        include: [
          { model: Collection,  as: 'collection' },
          { model: ProductType, as: 'type' },
          { model: Category,    as: 'category' },
          { model: Style,       as: 'style' },
          { model: PriceGroup,  as: 'priceGroup' },
          { model: Metal,       as: 'metals', through: { attributes: [] } },
          { model: Shape,       as: 'shapes', through: { attributes: [] } },
          { model: ProductMedia, as: 'media', order: [['sortOrder', 'ASC']] },
        ],
      });
      if (!product) return res.status(404).json({ message: 'Product not found' });
      res.json(product);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  /** POST /products — MASTER_ADMIN / EDITOR */
  async create(req, res) {
    try {
      const product = await Product.create({ ...req.body, companyId: req.tenant.id });
      res.status(201).json(product);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  /** PUT /products/:id — MASTER_ADMIN / EDITOR */
  async update(req, res) {
    try {
      const [updated] = await Product.update(req.body, { where: { id: req.params.id, companyId: req.tenant.id } });
      if (!updated) return res.status(404).json({ message: 'Product not found' });
      res.json({ message: 'Updated successfully' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  /** DELETE /products/:id — MASTER_ADMIN (soft delete) */
  async remove(req, res) {
    try {
      await Product.update({ isActive: false }, { where: { id: req.params.id, companyId: req.tenant.id } });
      res.json({ message: 'Product deactivated' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = ProductController;
