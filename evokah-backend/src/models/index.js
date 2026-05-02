'use strict';
// ── All Models ─────────────────────────────────────────────────
const Company     = require('./masters/Company');
const Collection  = require('./masters/Collection');
const ProductType = require('./masters/ProductType');
const Category    = require('./masters/Category');
const Style       = require('./masters/Style');
const Shape       = require('./masters/Shape');
const Metal       = require('./masters/Metal');
const PriceGroup  = require('./masters/PriceGroup');
const Product     = require('./product/Product');
const ProductMedia = require('./product/ProductMedia');
const { ProductMetal, ProductShape } = require('./product/ProductJunctions');
const { Role, User } = require('./user/UserModels');
const { CartItem, WishlistItem, SystemSetting, Review, FaqItem } = require('./content/ContentModels');
const { Translation, StoryContent } = require('./content/CmsModels');

// ── Multi-Tenant Associations (Company) ────────────────────────
const tenantModels = [
  Collection, ProductType, Category, Style, Shape, Metal, PriceGroup,
  Product, User, SystemSetting, Review, FaqItem, Translation, StoryContent,
  CartItem, WishlistItem
];

tenantModels.forEach(Model => {
  Company.hasMany(Model, { foreignKey: 'companyId' });
  Model.belongsTo(Company, { foreignKey: 'companyId', as: 'company' });
});

// ── Associations ───────────────────────────────────────────────
// Product → Masters (BelongsTo)
Product.belongsTo(Collection, { foreignKey: 'collectionId', as: 'collection' });
Product.belongsTo(ProductType, { foreignKey: 'typeId', as: 'type' });
Product.belongsTo(Category,   { foreignKey: 'categoryId', as: 'category' });
Product.belongsTo(Style,      { foreignKey: 'styleId', as: 'style' });
Product.belongsTo(PriceGroup, { foreignKey: 'priceGroupId', as: 'priceGroup' });

Collection.hasMany(Product,  { foreignKey: 'collectionId' });
Category.hasMany(Product,    { foreignKey: 'categoryId' });

// Category ← Collection
Category.belongsTo(Collection, { foreignKey: 'collectionId', as: 'collection' });
Collection.hasMany(Category,   { foreignKey: 'collectionId', as: 'categories' });

// Product ↔ Metal (many-to-many via junction)
Product.belongsToMany(Metal, { through: ProductMetal, foreignKey: 'productId', as: 'metals' });
Metal.belongsToMany(Product, { through: ProductMetal, foreignKey: 'metalId', as: 'products' });

// Product ↔ Shape (many-to-many via junction)
Product.belongsToMany(Shape, { through: ProductShape, foreignKey: 'productId', as: 'shapes' });
Shape.belongsToMany(Product, { through: ProductShape, foreignKey: 'shapeId', as: 'products' });

// Product → Media (one-to-many)
Product.hasMany(ProductMedia, { foreignKey: 'productId', as: 'media' });
ProductMedia.belongsTo(Product, { foreignKey: 'productId' });
ProductMedia.belongsTo(Metal,   { foreignKey: 'metalId', as: 'metal' });

// User → Role
User.belongsTo(Role, { foreignKey: 'roleId', as: 'role' });
Role.hasMany(User,   { foreignKey: 'roleId' });

// Cart / Wishlist → User & Product
CartItem.belongsTo(User,    { foreignKey: 'userId' });
CartItem.belongsTo(Product, { foreignKey: 'productId', as: 'product' });
CartItem.belongsTo(Metal,   { foreignKey: 'metalId', as: 'metal' });

WishlistItem.belongsTo(User,    { foreignKey: 'userId' });
WishlistItem.belongsTo(Product, { foreignKey: 'productId', as: 'product' });
WishlistItem.belongsTo(Metal,   { foreignKey: 'metalId', as: 'metal' });

module.exports = {
  Company, Collection, ProductType, Category, Style, Shape, Metal, PriceGroup,
  Product, ProductMedia, ProductMetal, ProductShape,
  Role, User,
  CartItem, WishlistItem, SystemSetting, Review, FaqItem,
  Translation, StoryContent,
};
