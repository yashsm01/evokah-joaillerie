'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

// Style = the ring design style (solitaire, halo, pave, knot, cluster…)
const Style = sequelize.define('Style', {
  id:   { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },  // Halo, Pavé, Solitaire
  slug: { type: DataTypes.STRING, allowNull: false, unique: true }, // halo, pave, solitaire
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
}, { tableName: 'styles', underscored: true });

module.exports = Style;
