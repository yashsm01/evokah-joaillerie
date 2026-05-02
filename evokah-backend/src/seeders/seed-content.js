'use strict';
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
require('../models/index'); 
const sequelize = require('../config/database');
const { Company, SystemSetting, Translation, StoryContent, Review, FaqItem } = require('../models');

async function seed() {
  try {
    await sequelize.authenticate();
    console.log('🌱 Seeding CMS content...');

    const company = await Company.findOne({ where: { slug: 'evokah' } });
    const cId = company.id;

    // ── System Settings ──────────────────────────────────────────
    await SystemSetting.findOrCreate({
      where: { settingKey: 'GLOBAL_THEME', companyId: cId },
      defaults: { settingValue: { active: 'ocean' } }
    });
    await SystemSetting.findOrCreate({
      where: { settingKey: 'ANNOUNCEMENT', companyId: cId },
      defaults: { settingValue: { 
        en: '✦ Free global shipping on orders over $500', 
        fr: '✦ Livraison gratuite dans le monde entier pour les commandes de plus de 500 $' 
      } }
    });
    console.log('  ✅ SystemSettings');

    // ── Translations ─────────────────────────────────────────────
    const trans = [
      { lang: 'en', key: 'NAV_ENGAGEMENT', value: 'Engagement' },
      { lang: 'en', key: 'NAV_WEDDING',    value: 'Wedding' },
      { lang: 'fr', key: 'NAV_ENGAGEMENT', value: 'Fiançailles' },
      { lang: 'fr', key: 'NAV_WEDDING',    value: 'Mariage' },
    ];
    for (const t of trans) {
      await Translation.findOrCreate({ where: { lang: t.lang, key: t.key, companyId: cId }, defaults: t });
    }
    console.log('  ✅ Translations');

    // ── Story Content ────────────────────────────────────────────
    const story = [
      { type: 'milestone', year: '2015', title: 'The Beginning', desc: 'Evokah was founded in Montreal.' },
      { type: 'stat', number: '10k+', label: 'Happy Customers' },
      { type: 'value', title: 'Sustainable', desc: 'We only use recycled gold.', icon: 'leaf' },
    ];
    for (const s of story) {
      await StoryContent.findOrCreate({ where: { title: s.title || '', label: s.label || '', companyId: cId }, defaults: s });
    }
    console.log('  ✅ StoryContent');

    // ── FAQ ──────────────────────────────────────────────────────
    await FaqItem.findOrCreate({
      where: { question: 'What is your return policy?', companyId: cId },
      defaults: { answer: '30-day money back guarantee.', sortOrder: 1 }
    });
    console.log('  ✅ FAQ');

    // ── Reviews ──────────────────────────────────────────────────
    await Review.findOrCreate({
      where: { author: 'Sarah J.', companyId: cId },
      defaults: { text: 'Beautiful ring, amazing service!', collectionSlug: 'engagement', featured: true }
    });
    console.log('  ✅ Reviews');

    console.log('\n🎉 Content seed complete!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Content seed failed:', err);
    process.exit(1);
  }
}

seed();
