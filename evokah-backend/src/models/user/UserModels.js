'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Role = sequelize.define('Role', {
  id:   { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.ENUM('MASTER_ADMIN', 'EDITOR', 'CUSTOMER'), allowNull: false },
}, { 
  tableName: 'roles', 
  underscored: true,
  indexes: [{ unique: true, fields: ['name'] }]
});

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id: { type: string, format: uuid }
 *         firstName: { type: string }
 *         lastName: { type: string }
 *         email: { type: string, format: email }
 *         roleId: { type: string, format: uuid }
 *         isActive: { type: boolean }
 */
const User = sequelize.define('User', {
  id:           { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  firstName:    { type: DataTypes.STRING, allowNull: false },
  lastName:     { type: DataTypes.STRING, allowNull: false },
  email:        { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
  passwordHash: { type: DataTypes.STRING, allowNull: false },
  roleId:       { type: DataTypes.UUID, allowNull: false },
  isActive:     { type: DataTypes.BOOLEAN, defaultValue: true },
}, { tableName: 'users', underscored: true });

module.exports = { Role, User };
