'use strict';
const router = require('express').Router();
const MediaController = require('../controllers/MediaController');
const { verifyToken } = require('../middleware/auth.middleware');
const { authorizeRoles } = require('../middleware/role.middleware');
const { upload } = require('../middleware/upload.middleware');

const guard = [verifyToken, authorizeRoles('MASTER_ADMIN', 'EDITOR')];

router.post('/upload/:productId', ...guard, upload.single('file'), MediaController.upload);
router.put('/:mediaId/primary',  ...guard, MediaController.setPrimary);
router.delete('/:mediaId',       ...guard, MediaController.remove);

module.exports = router;
