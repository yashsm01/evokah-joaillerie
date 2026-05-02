'use strict';
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
require('../models/index'); // register all associations
const sequelize = require('../config/database');
const { Company, Role, User } = require('../models');
const bcrypt = require('bcryptjs');

async function seedAdmin() {
  await sequelize.authenticate();
  console.log('🌱 Seeding admin user...');

  const company = await Company.findOne({ where: { slug: 'evokah' } });
  if (!company) {
    console.error('❌ Evokah company not found! Run seed:masters first.');
    process.exit(1);
  }

  const role = await Role.findOne({ where: { name: 'MASTER_ADMIN' } });
  if (!role) {
    console.error('❌ MASTER_ADMIN role not found! Run seed:masters first.');
    process.exit(1);
  }

  const email = 'admin@evokah.com';
  const password = 'Password123!';
  const passwordHash = await bcrypt.hash(password, 10);

  const [user, created] = await User.findOrCreate({
    where: { email },
    defaults: {
      companyId: company.id,
      firstName: 'Master',
      lastName: 'Admin',
      passwordHash,
      roleId: role.id,
      isActive: true
    }
  });

  if (!created) {
    // Update password if already exists
    user.passwordHash = passwordHash;
    await user.save();
    console.log(`  ✅ Admin user updated: ${email}`);
  } else {
    console.log(`  ✅ Admin user created: ${email}`);
  }
  
  console.log(`  🔑 Password: ${password}`);
  console.log('\n🎉 Admin seed complete!');
  process.exit(0);
}

seedAdmin().catch(err => { console.error('❌ Seed failed:', err); process.exit(1); });
