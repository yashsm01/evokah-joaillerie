'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

// Junction: Product ↔ Metal (many-to-many)
const ProductMetal = sequelize.define('ProductMetal', {
  productId: { type: DataTypes.UUID, allowNull: false },
  metalId:   { type: DataTypes.UUID, allowNull: false },
}, { tableName: 'product_metals', underscored: true, timestamps: false });

// Junction: Product ↔ Shape (many-to-many)
const ProductShape = sequelize.define('ProductShape', {
  productId: { type: DataTypes.UUID, allowNull: false },
  shapeId:   { type: DataTypes.UUID, allowNull: false },
}, { tableName: 'product_shapes', underscored: true, timestamps: false });

module.exports = { ProductMetal, ProductShape };
