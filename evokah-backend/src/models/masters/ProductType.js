'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const ProductType = sequelize.define('ProductType', {
  id:   { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },   // Ring, Necklace, Earring, Bracelet
  slug: { type: DataTypes.STRING, allowNull: false, unique: true }, // ring, necklace, earring, bracelet
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
}, { tableName: 'product_types', underscored: true });

module.exports = ProductType;
