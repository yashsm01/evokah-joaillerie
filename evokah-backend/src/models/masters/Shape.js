'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

// Stone shape (Round, Oval, Emerald, Pear, Princess, Cushion, Marquise, Asscher, Radiant, Heart)
const Shape = sequelize.define('Shape', {
  id:   { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  slug: { type: DataTypes.STRING, allowNull: false, unique: true },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
}, { tableName: 'shapes', underscored: true });

module.exports = Shape;
