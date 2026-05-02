'use strict';
const router = require('express').Router();
const WishlistController = require('../controllers/WishlistController');
const { verifyToken } = require('../middleware/auth.middleware');

router.use(verifyToken);

router.get('/',            WishlistController.getWishlist);
router.post('/toggle',     WishlistController.toggle);
router.delete('/:itemId',  WishlistController.remove);

module.exports = router;
