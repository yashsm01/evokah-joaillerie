'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const CartItem = sequelize.define('CartItem', {
  id:        { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  companyId: { type: DataTypes.UUID, allowNull: false },
  userId:    { type: DataTypes.UUID, allowNull: false },
  productId: { type: DataTypes.UUID, allowNull: false },
  metalId:   { type: DataTypes.UUID, allowNull: false },
  qty:       { type: DataTypes.INTEGER, defaultValue: 1, validate: { min: 1 } },
}, { tableName: 'cart_items', underscored: true });

const WishlistItem = sequelize.define('WishlistItem', {
  id:        { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  companyId: { type: DataTypes.UUID, allowNull: false },
  userId:    { type: DataTypes.UUID, allowNull: false },
  productId: { type: DataTypes.UUID, allowNull: false },
  metalId:   { type: DataTypes.UUID, allowNull: false },
}, { tableName: 'wishlist_items', underscored: true });

const SystemSetting = sequelize.define('SystemSetting', {
  id:           { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  companyId:    { type: DataTypes.UUID, allowNull: false },
  settingKey:   { type: DataTypes.STRING, allowNull: false },
  settingValue: { type: DataTypes.JSONB, allowNull: false },
}, { 
  tableName: 'system_settings', 
  underscored: true,
  indexes: [{ unique: true, fields: ['company_id', 'setting_key'] }]
});

const Review = sequelize.define('Review', {
  id:           { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  companyId:    { type: DataTypes.UUID, allowNull: false },
  author:       { type: DataTypes.STRING, allowNull: false },
  text:         { type: DataTypes.TEXT, allowNull: false },
  date:         { type: DataTypes.STRING },
  collectionSlug: { type: DataTypes.STRING },  // 'engagement', 'wedding', 'all'
  featured:     { type: DataTypes.BOOLEAN, defaultValue: false },
}, { tableName: 'reviews', underscored: true });

const FaqItem = sequelize.define('FaqItem', {
  id:             { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  companyId:      { type: DataTypes.UUID, allowNull: false },
  question:       { type: DataTypes.TEXT, allowNull: false },
  answer:         { type: DataTypes.TEXT, allowNull: false },
  collectionSlug: { type: DataTypes.STRING },
  sortOrder:      { type: DataTypes.INTEGER, defaultValue: 0 },
}, { tableName: 'faq_items', underscored: true });

module.exports = { CartItem, WishlistItem, SystemSetting, Review, FaqItem };
