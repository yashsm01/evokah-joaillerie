'use strict';
const router = require('express').Router();
const ProductController = require('../controllers/ProductController');
const { verifyToken } = require('../middleware/auth.middleware');
const { authorizeRoles } = require('../middleware/role.middleware');

router.get('/',       ProductController.getAll);
router.get('/:slug',  ProductController.getBySlug);
router.post('/',      verifyToken, authorizeRoles('MASTER_ADMIN', 'EDITOR'), ProductController.create);
router.put('/:id',    verifyToken, authorizeRoles('MASTER_ADMIN', 'EDITOR'), ProductController.update);
router.delete('/:id', verifyToken, authorizeRoles('MASTER_ADMIN'),           ProductController.remove);

module.exports = router;
