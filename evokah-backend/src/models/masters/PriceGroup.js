'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const PriceGroup = sequelize.define('PriceGroup', {
  id:       { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  label:    { type: DataTypes.STRING, allowNull: false },   // '$3,000 – $5,000'
  slug:     { type: DataTypes.STRING, allowNull: false, unique: true }, // '3000-5000'
  minPrice: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  maxPrice: { type: DataTypes.DECIMAL(10, 2), allowNull: true }, // null = no upper bound
}, { tableName: 'price_groups', underscored: true });

module.exports = PriceGroup;
