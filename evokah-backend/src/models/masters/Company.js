'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Company = sequelize.define('Company', {
  id:       { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name:     { type: DataTypes.STRING, allowNull: false },
  slug:     { type: DataTypes.STRING, allowNull: false, unique: true },
  domain:   { type: DataTypes.STRING, allowNull: true, unique: true },
  logoUrl:  { type: DataTypes.STRING, allowNull: true },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
}, { 
  tableName: 'companies', 
  underscored: true 
});

module.exports = Company;
