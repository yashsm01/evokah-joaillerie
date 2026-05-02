'use strict';
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
require('../models/index'); // register all associations
const sequelize = require('../config/database');
const { Company, Collection, ProductType, Category, Style, Shape, Metal, PriceGroup, Role } = require('../models');

async function seed() {
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });
  console.log('🌱 Seeding master data...');

  // ── Companies ───────────────────────────────────────────────
  const [company] = await Company.findOrCreate({ 
    where: { slug: 'evokah' }, 
    defaults: { id: '11111111-1111-1111-1111-111111111111', name: 'Evokah Joaillerie', domain: 'localhost' } 
  });
  const cId = company.id;
  console.log('  ✅ Company:', company.name);

  // ── Roles ───────────────────────────────────────────────────
  for (const name of ['MASTER_ADMIN', 'EDITOR', 'CUSTOMER']) {
    await Role.findOrCreate({ where: { name } });
  }
  console.log('  ✅ Roles');

  // ── Collections ─────────────────────────────────────────────
  const [engagement] = await Collection.findOrCreate({ where: { slug: 'engagement', companyId: cId }, defaults: { name: 'Engagement', sortOrder: 1 } });
  const [wedding]    = await Collection.findOrCreate({ where: { slug: 'wedding', companyId: cId },    defaults: { name: 'Wedding',    sortOrder: 2 } });
  await Collection.findOrCreate({ where: { slug: 'all', companyId: cId }, defaults: { name: 'Shop All', sortOrder: 3 } });
  console.log('  ✅ Collections');

  // ── Product Types ───────────────────────────────────────────
  for (const [name, slug] of [['Ring','ring'],['Necklace','necklace'],['Earring','earring'],['Bracelet','bracelet']]) {
    await ProductType.findOrCreate({ where: { slug, companyId: cId }, defaults: { name } });
  }
  console.log('  ✅ ProductTypes');

  // ── Categories ──────────────────────────────────────────────
  const engCategories = [['Love Knot','love-knot'],['Secret Heart','secret-heart'],['Cluster Halo','cluster-halo'],['Cathedral','cathedral'],['Hidden Halo','hidden-halo'],['Statement','statement']];
  for (const [name, slug] of engCategories) {
    await Category.findOrCreate({ where: { slug, companyId: cId }, defaults: { name, collectionId: engagement.id } });
  }
  const wedCategories = [['Wedding Band','wedding-band'],['Eternity Band','eternity-band']];
  for (const [name, slug] of wedCategories) {
    await Category.findOrCreate({ where: { slug, companyId: cId }, defaults: { name, collectionId: wedding.id } });
  }
  console.log('  ✅ Categories');

  // ── Styles ──────────────────────────────────────────────────
  const styles = [['Solitaire','solitaire'],['Halo','halo'],['Pavé','pave'],['Love Knot','knot'],['Cluster','cluster'],['Blossom','blossom'],['Plain','plain'],['Eternity','eternity'],['Patterned','patterned'],['Contour','contour'],['Pendant','pendant'],['Stud','stud'],['Hoop','hoop']];
  for (const [name, slug] of styles) {
    await Style.findOrCreate({ where: { slug, companyId: cId }, defaults: { name } });
  }
  console.log('  ✅ Styles');

  // ── Shapes ──────────────────────────────────────────────────
  const shapes = ['Round','Oval','Emerald','Princess','Cushion','Pear','Radiant','Heart','Marquise','Asscher','Lab-grown','Natural','Polished','Hammered'];
  for (const name of shapes) {
    await Shape.findOrCreate({ where: { slug: name.toLowerCase(), companyId: cId }, defaults: { name } });
  }
  console.log('  ✅ Shapes');

  // ── Metals ──────────────────────────────────────────────────
  const metals = [
    { name: 'Yellow Gold', code: 'yellow-gold', hexColor: '#D4AF37', metalPremium: 0 },
    { name: 'White Gold',  code: 'white-gold',  hexColor: '#E8E8E8', metalPremium: 200 },
    { name: 'Rose Gold',   code: 'rose-gold',   hexColor: '#B76E79', metalPremium: 100 },
    { name: 'Platinum',    code: 'platinum',    hexColor: '#E5E4E2', metalPremium: 600 },
  ];
  for (const m of metals) {
    await Metal.findOrCreate({ where: { code: m.code, companyId: cId }, defaults: m });
  }
  console.log('  ✅ Metals');

  // ── Price Groups ─────────────────────────────────────────────
  const priceGroups = [
    { label: 'Under $3,000',     slug: 'under3000',   minPrice: 0,    maxPrice: 2999 },
    { label: '$3,000 – $5,000',  slug: '3000-5000',   minPrice: 3000, maxPrice: 5000 },
    { label: '$5,000 – $10,000', slug: '5000-10000',  minPrice: 5001, maxPrice: 10000 },
    { label: 'Over $10,000',     slug: 'over10000',   minPrice: 10001, maxPrice: null },
  ];
  for (const pg of priceGroups) {
    await PriceGroup.findOrCreate({ where: { slug: pg.slug, companyId: cId }, defaults: pg });
  }
  console.log('  ✅ PriceGroups');

  console.log('\n🎉 Master seed complete!');
  process.exit(0);
}

seed().catch(err => { console.error('❌ Seed failed:', err); process.exit(1); });
