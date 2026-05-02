'use strict';
const { PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { r2Client, BUCKET, PUBLIC_URL } = require('../config/r2.config');
const { ProductMedia } = require('../models');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

/**
 * @swagger
 * tags:
 *   name: Media
 *   description: Cloudflare R2 media upload and management
 */
const MediaController = {

  /**
   * @swagger
   * /media/upload/{productId}:
   *   post:
   *     tags: [Media]
   *     summary: Upload image, video, or .glb 3D model for a product
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: productId
   *         required: true
   *         schema: { type: string, format: uuid }
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             properties:
   *               file:
   *                 type: string
   *                 format: binary
   *               mediaType:
   *                 type: string
   *                 enum: [image, video, 3d_model]
   *               metalId:
   *                 type: string
   *                 description: Optional metal UUID for variant images
   *               isPrimary:
   *                 type: boolean
   *     responses:
   *       201: { description: Media uploaded and linked }
   */
  async upload(req, res) {
    try {
      const { productId } = req.params;
      const { mediaType, metalId, isPrimary, alt } = req.body;
      const file = req.file;
      if (!file) return res.status(400).json({ message: 'No file provided' });

      const ext    = path.extname(file.originalname);
      const key    = `products/${productId}/${uuidv4()}${ext}`;
      const mime   = file.originalname.endsWith('.glb') ? 'model/gltf-binary' : file.mimetype;

      await r2Client.send(new PutObjectCommand({
        Bucket:      BUCKET,
        Key:         key,
        Body:        file.buffer,
        ContentType: mime,
      }));

      const url = `${PUBLIC_URL}/${key}`;

      // If isPrimary, unset any existing primary of same mediaType
      if (isPrimary === 'true') {
        await ProductMedia.update({ isPrimary: false }, { where: { productId, mediaType } });
      }

      const media = await ProductMedia.create({
        productId, mediaType, url,
        isPrimary: isPrimary === 'true',
        metalId: metalId || null,
        alt: alt || '',
      });

      res.status(201).json({ message: 'Uploaded successfully', media });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  /**
   * @swagger
   * /media/{mediaId}/primary:
   *   put:
   *     tags: [Media]
   *     summary: Set a media item as the primary display asset
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: mediaId
   *         required: true
   *         schema: { type: string, format: uuid }
   *     responses:
   *       200: { description: Primary updated }
   */
  async setPrimary(req, res) {
    try {
      const media = await ProductMedia.findByPk(req.params.mediaId);
      if (!media) return res.status(404).json({ message: 'Media not found' });
      // Unset others of same type
      await ProductMedia.update({ isPrimary: false }, { where: { productId: media.productId, mediaType: media.mediaType } });
      await media.update({ isPrimary: true });
      res.json({ message: 'Primary media updated' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  /**
   * @swagger
   * /media/{mediaId}:
   *   delete:
   *     tags: [Media]
   *     summary: Delete media from R2 and database
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: mediaId
   *         required: true
   *         schema: { type: string, format: uuid }
   *     responses:
   *       200: { description: Media deleted }
   */
  async remove(req, res) {
    try {
      const media = await ProductMedia.findByPk(req.params.mediaId);
      if (!media) return res.status(404).json({ message: 'Media not found' });

      // Extract R2 key from URL
      const key = media.url.replace(`${PUBLIC_URL}/`, '');
      await r2Client.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: key }));
      await media.destroy();
      res.json({ message: 'Media deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = MediaController;
