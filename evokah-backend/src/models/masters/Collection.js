'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

/**
 * @swagger
 * components:
 *   schemas:
 *     Collection:
 *       type: object
 *       properties:
 *         id: { type: string, format: uuid }
 *         name: { type: string, example: Engagement }
 *         slug: { type: string, example: engagement }
 *         sortOrder: { type: integer }
 *         isActive: { type: boolean }
 */
const Collection = sequelize.define('Collection', {
  id:        { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  companyId: { type: DataTypes.UUID, allowNull: false },
  name:      { type: DataTypes.STRING, allowNull: false },
  slug:      { type: DataTypes.STRING, allowNull: false, unique: true },
  sortOrder: { type: DataTypes.INTEGER, defaultValue: 0 },
  isActive:  { type: DataTypes.BOOLEAN, defaultValue: true },
}, { tableName: 'collections', underscored: true });

module.exports = Collection;
