'use strict';
const { CartItem, WishlistItem, Product, Metal } = require('../models');

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Persisted shopping cart (JWT required)
 */
const CartController = {

  /**
   * @swagger
   * /cart:
   *   get:
   *     tags: [Cart]
   *     summary: Get current user's cart
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200: { description: Array of cart items with product and metal details }
   */
  async getCart(req, res) {
    try {
      const items = await CartItem.findAll({
        where: { userId: req.user.id },
        include: [
          { model: Product, as: 'product', attributes: ['id', 'name', 'slug', 'basePrice'] },
          { model: Metal,   as: 'metal',   attributes: ['id', 'name', 'code', 'hexColor', 'metalPremium'] },
        ],
      });
      res.json(items);
    } catch (err) { res.status(500).json({ message: err.message }); }
  },

  /**
   * @swagger
   * /cart/add:
   *   post:
   *     tags: [Cart]
   *     summary: Add a product+metal to cart (increments qty if exists)
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
   *       200: { description: Cart item added or qty incremented }
   */
  async addItem(req, res) {
    try {
      const { productId, metalId } = req.body;
      const [item, created] = await CartItem.findOrCreate({
        where: { userId: req.user.id, productId, metalId },
        defaults: { qty: 1 },
      });
      if (!created) await item.increment('qty', { by: 1 });
      res.json({ message: created ? 'Added to cart' : 'Quantity updated', item });
    } catch (err) { res.status(500).json({ message: err.message }); }
  },

  /**
   * @swagger
   * /cart/{itemId}:
   *   patch:
   *     tags: [Cart]
   *     summary: Update quantity of a cart item
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: itemId
   *         required: true
   *         schema: { type: string, format: uuid }
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               qty: { type: integer, minimum: 1 }
   *     responses:
   *       200: { description: Quantity updated }
   *       404: { description: Cart item not found }
   */
  async updateQty(req, res) {
    try {
      const item = await CartItem.findOne({ where: { id: req.params.itemId, userId: req.user.id } });
      if (!item) return res.status(404).json({ message: 'Cart item not found' });
      if (req.body.qty < 1) {
        await item.destroy();
        return res.json({ message: 'Item removed from cart' });
      }
      await item.update({ qty: req.body.qty });
      res.json({ message: 'Quantity updated', item });
    } catch (err) { res.status(500).json({ message: err.message }); }
  },

  /** DELETE /cart/:itemId */
  async removeItem(req, res) {
    try {
      await CartItem.destroy({ where: { id: req.params.itemId, userId: req.user.id } });
      res.json({ message: 'Item removed' });
    } catch (err) { res.status(500).json({ message: err.message }); }
  },

  /** DELETE /cart/clear */
  async clearCart(req, res) {
    try {
      await CartItem.destroy({ where: { userId: req.user.id } });
      res.json({ message: 'Cart cleared' });
    } catch (err) { res.status(500).json({ message: err.message }); }
  },
};

module.exports = CartController;
