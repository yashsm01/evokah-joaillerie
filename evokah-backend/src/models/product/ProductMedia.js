'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductMedia:
 *       type: object
 *       properties:
 *         id: { type: string, format: uuid }
 *         productId: { type: string, format: uuid }
 *         mediaType:
 *           type: string
 *           enum: [image, video, 3d_model]
 *         url: { type: string, description: Cloudflare R2 public URL }
 *         isPrimary: { type: boolean, description: Master grid image override }
 *         metalId: { type: string, format: uuid, nullable: true }
 *         sortOrder: { type: integer }
 *         alt: { type: string }
 */
const ProductMedia = sequelize.define('ProductMedia', {
  id:        { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  productId: { type: DataTypes.UUID, allowNull: false },
  mediaType: { type: DataTypes.ENUM('image', 'video', '3d_model'), allowNull: false },
  url:       { type: DataTypes.TEXT, allowNull: false },
  isPrimary: { type: DataTypes.BOOLEAN, defaultValue: false },
  metalId:   { type: DataTypes.UUID, allowNull: true },  // optional metal-specific media
  sortOrder: { type: DataTypes.INTEGER, defaultValue: 0 },
  alt:       { type: DataTypes.TEXT },
}, { tableName: 'product_media', underscored: true });

module.exports = ProductMedia;
