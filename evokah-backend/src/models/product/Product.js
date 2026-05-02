'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id: { type: string, format: uuid }
 *         name: { type: string }
 *         slug: { type: string }
 *         description: { type: string }
 *         basePrice: { type: number }
 *         tag: { type: string, example: Bestseller }
 *         isActive: { type: boolean }
 */
const Product = sequelize.define('Product', {
  id:          { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name:        { type: DataTypes.STRING, allowNull: false },
  slug:        { type: DataTypes.STRING, allowNull: false, unique: true },
  description: { type: DataTypes.TEXT },
  basePrice:   { type: DataTypes.DECIMAL(12, 2), allowNull: false },
  tag:         { type: DataTypes.STRING },   // Bestseller, New Arrival, Exclusive, Popular
  isActive:    { type: DataTypes.BOOLEAN, defaultValue: true },
  // FKs — set via associations in index.js
  collectionId: { type: DataTypes.UUID, allowNull: false },
  typeId:       { type: DataTypes.UUID, allowNull: false },
  categoryId:   { type: DataTypes.UUID, allowNull: false },
  styleId:      { type: DataTypes.UUID, allowNull: false },
  priceGroupId: { type: DataTypes.UUID, allowNull: false },
}, { tableName: 'products', underscored: true });

module.exports = Product;
