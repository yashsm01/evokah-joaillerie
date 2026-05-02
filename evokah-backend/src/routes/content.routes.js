'use strict';
const router = require('express').Router();
const ContentController = require('../controllers/ContentController');
const { verifyToken } = require('../middleware/auth.middleware');
const { authorizeRoles } = require('../middleware/role.middleware');

const adminGuard = [verifyToken, authorizeRoles('MASTER_ADMIN')];

// Story
router.get('/story',          ContentController.getStory);
router.put('/story',          ...adminGuard, ContentController.upsertStoryItem);

// FAQ
router.get('/faq',            ContentController.getFaq);

// Reviews
router.get('/reviews',        ContentController.getReviews);
router.post('/reviews',       ...adminGuard, ContentController.createReview);

// Translations — EN/FR strings
router.get('/translations',   ContentController.getTranslations);
router.put('/translations',   ...adminGuard, ContentController.updateTranslation);

module.exports = router;
