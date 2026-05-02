'use strict';
const router = require('express').Router();
const CartController = require('../controllers/CartController');
const { verifyToken } = require('../middleware/auth.middleware');

// All cart routes require JWT
router.use(verifyToken);

router.get('/',            CartController.getCart);
router.post('/add',        CartController.addItem);
router.patch('/:itemId',   CartController.updateQty);
router.delete('/clear',    CartController.clearCart);
router.delete('/:itemId',  CartController.removeItem);

module.exports = router;
