'use strict';
const { WishlistItem, Product, Metal } = require('../models');

/**
 * @swagger
 * tags:
 *   name: Wishlist
 *   description: Persisted wishlist (JWT required)
 */
const WishlistController = {

  /**
   * @swagger
   * /wishlist:
   *   get:
   *     tags: [Wishlist]
   *     summary: Get current user's wishlist
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200: { description: Array of wishlist items }
   */
  async getWishlist(req, res) {
    try {
      const items = await WishlistItem.findAll({
        where: { userId: req.user.id, companyId: req.tenant.id },
        include: [
          { model: Product, as: 'product', attributes: ['id', 'name', 'slug', 'basePrice', 'tag'] },
          { model: Metal,   as: 'metal',   attributes: ['id', 'name', 'code', 'hexColor'] },
        ],
      });
      res.json(items);
    } catch (err) { res.status(500).json({ message: err.message }); }
  },

  /**
   * @swagger
   * /wishlist/toggle:
   *   post:
   *     tags: [Wishlist]
   *     summary: Toggle a product+metal in wishlist (add if absent, remove if present)
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [productId, metalId]
   *             properties:
   *               productId: { type: string, format: uuid }
   *               metalId:   { type: string, format: uuid }
   *     responses:
   *       200: { description: Added or removed from wishlist }
   */
  async toggle(req, res) {
    try {
      const { productId, metalId } = req.body;
      const existing = await WishlistItem.findOne({ where: { userId: req.user.id, productId, metalId, companyId: req.tenant.id } });
      if (existing) {
        await existing.destroy();
        return res.json({ message: 'Removed from wishlist', action: 'removed' });
      }
      const item = await WishlistItem.create({ userId: req.user.id, productId, metalId, companyId: req.tenant.id });
      res.json({ message: 'Added to wishlist', action: 'added', item });
    } catch (err) { res.status(500).json({ message: err.message }); }
  },

  /** DELETE /wishlist/:itemId */
  async remove(req, res) {
    try {
      await WishlistItem.destroy({ where: { id: req.params.itemId, userId: req.user.id, companyId: req.tenant.id } });
      res.json({ message: 'Removed from wishlist' });
    } catch (err) { res.status(500).json({ message: err.message }); }
  },
};

module.exports = WishlistController;
