'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

// Category is a named design line (e.g. Love Knot, Secret Heart, Cathedral)
// Belongs to a Collection (optional — some categories span both)
const Category = sequelize.define('Category', {
  id:           { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name:         { type: DataTypes.STRING, allowNull: false },
  slug:         { type: DataTypes.STRING, allowNull: false, unique: true },
  collectionId: { type: DataTypes.UUID, allowNull: true },   // FK set in index.js
  sortOrder:    { type: DataTypes.INTEGER, defaultValue: 0 },
  isActive:     { type: DataTypes.BOOLEAN, defaultValue: true },
}, { tableName: 'categories', underscored: true });

module.exports = Category;
