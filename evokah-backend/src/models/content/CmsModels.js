'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

/**
 * @swagger
 * components:
 *   schemas:
 *     Translation:
 *       type: object
 *       properties:
 *         lang: { type: string, enum: [en, fr] }
 *         key:  { type: string, example: nav_engagement }
 *         value: { type: string }
 */
const Translation = sequelize.define('Translation', {
  id:    { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  companyId: { type: DataTypes.UUID, allowNull: false },
  lang:  { type: DataTypes.ENUM('en', 'fr'), allowNull: false },
  key:   { type: DataTypes.STRING, allowNull: false },   // e.g. 'nav_engagement'
  value: { type: DataTypes.TEXT, allowNull: false },     // e.g. 'Engagement' / 'Fiançailles'
}, {
  tableName: 'translations',
  underscored: true,
  indexes: [{ unique: true, fields: ['company_id', 'lang', 'key'] }],
});

/**
 * StoryContent — holds CMS-editable brand story data
 * type: 'milestone' | 'stat' | 'value'
 */
const StoryContent = sequelize.define('StoryContent', {
  id:        { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  companyId: { type: DataTypes.UUID, allowNull: false },
  type:      { type: DataTypes.ENUM('milestone', 'stat', 'value'), allowNull: false },
  year:      { type: DataTypes.STRING },          // for milestones: '2017'
  title:     { type: DataTypes.STRING, allowNull: false },
  desc:      { type: DataTypes.TEXT },
  icon:      { type: DataTypes.STRING },          // for values: '✦'
  number:    { type: DataTypes.STRING },          // for stats: '4,000+'
  label:     { type: DataTypes.STRING },          // for stats: 'Bespoke Pieces Crafted'
  sortOrder: { type: DataTypes.INTEGER, defaultValue: 0 },
}, { tableName: 'story_content', underscored: true });

module.exports = { Translation, StoryContent };
