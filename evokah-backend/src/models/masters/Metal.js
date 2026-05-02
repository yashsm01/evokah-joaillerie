'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

/**
 * @swagger
 * components:
 *   schemas:
 *     Metal:
 *       type: object
 *       properties:
 *         id: { type: string, format: uuid }
 *         name: { type: string, example: Yellow Gold }
 *         code: { type: string, example: yellow-gold }
 *         hexColor: { type: string, example: '#D4AF37' }
 *         metalPremium: { type: number, example: 0 }
 */
const Metal = sequelize.define('Metal', {
  id:           { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name:         { type: DataTypes.STRING, allowNull: false },   // Yellow Gold
  code:         { type: DataTypes.STRING, allowNull: false, unique: true }, // yellow-gold
  hexColor:     { type: DataTypes.STRING, allowNull: true },    // #D4AF37
  metalPremium: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 }, // price delta CAD
  isActive:     { type: DataTypes.BOOLEAN, defaultValue: true },
}, { tableName: 'metals', underscored: true });

module.exports = Metal;
