'use strict';
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
require('../models/index'); 
const sequelize = require('../config/database');
const { 
  Product, ProductMedia, Collection, ProductType, Category, 
  Style, Metal, Shape, PriceGroup, ProductMetal, ProductShape 
} = require('../models');

const MOCK_PRODUCTS = [
  {
    name: 'Love Knot Bezel-Set Yellow Diamond Engagement Ring',
    category: 'love-knot', style: 'knot', type: 'ring', tag: 'New Arrival', basePrice: 12660,
    metals: ['yellow-gold', 'white-gold', 'rose-gold'],
    shapes: ['lab-grown', 'natural'],
    img: 'https://ecksand.com/cdn/shop/files/45609_p_14961261576560_img_66500335403376_love-knot-bezel-set-yellow-diamond-engagement-ring.png',
    images: [
      'https://ecksand.com/cdn/shop/files/45609_p_14961261576560_img_66500335403376_love-knot-bezel-set-yellow-diamond-engagement-ring.png',
      'https://ecksand.com/cdn/shop/files/ecksand-45608-y-7.36-ring.png',
      'https://ecksand.com/cdn/shop/files/45610_p_14961257120112_img_66500058677616_hidden-cluster-halo-diamond-engagement-ring.png',
      'https://ecksand.com/cdn/shop/files/43668_p_14624095011184_img_67122937168240_hidden-diamond-halo-engagement-ring.png',
    ],
    metalImages: {
      'yellow-gold': 'https://ecksand.com/cdn/shop/files/45609_p_14961261576560_img_66500335403376_love-knot-bezel-set-yellow-diamond-engagement-ring.png',
      'white-gold': 'https://ecksand.com/cdn/shop/files/ecksand-45608-y-7.36-ring.png',
      'rose-gold': 'https://ecksand.com/cdn/shop/files/ecksand-30958-y-1.00-oval-diamond-ring_3790eef0-ed8c-4e51-b1c8-7d0081e01a2a.png',
    },
    modelUrl: 'https://images.hinex.store/1777702007052-diamond_engagement_ring.glb',
    priceGroup: 'over10000', collection: 'engagement', slug: 'love-knot-bezel-set-yellow-diamond',
    description: 'A stunning love knot silhouette with bezel-set yellow diamonds in recycled 18k gold. Each curve is hand-formed to create a seamless, flowing design that wraps the centre stone in an embrace of light.',
  },
  {
    name: 'Diamond Engagement Ring with Side Diamonds and Secret Heart',
    category: 'secret-heart', style: 'halo', type: 'ring', tag: 'Bestseller', basePrice: 6471,
    metals: ['yellow-gold', 'white-gold', 'rose-gold', 'platinum'],
    shapes: ['oval'],
    img: 'https://ecksand.com/cdn/shop/files/ecksand-45608-y-7.36-ring.png',
    images: [
      'https://ecksand.com/cdn/shop/files/ecksand-45608-y-7.36-ring.png',
      'https://ecksand.com/cdn/shop/files/45609_p_14961261576560_img_66500335403376_love-knot-bezel-set-yellow-diamond-engagement-ring.png',
      'https://ecksand.com/cdn/shop/files/43668_p_14624095011184_img_67122937168240_hidden-diamond-halo-engagement-ring.png',
    ],
    metalImages: {
      'yellow-gold': 'https://ecksand.com/cdn/shop/files/ecksand-45608-y-7.36-ring.png',
      'white-gold': 'https://ecksand.com/cdn/shop/files/45609_p_14961261576560_img_66500335403376_love-knot-bezel-set-yellow-diamond-engagement-ring.png',
      'rose-gold': 'https://ecksand.com/cdn/shop/files/ecksand-30958-y-1.00-oval-diamond-ring_3790eef0-ed8c-4e51-b1c8-7d0081e01a2a.png',
      'platinum': 'https://ecksand.com/cdn/shop/files/45610_p_14961257120112_img_66500058677616_hidden-cluster-halo-diamond-engagement-ring.png',
    },
    priceGroup: '5000-10000', collection: 'engagement', slug: 'secret-heart-side-diamonds',
    description: 'An oval diamond flanked by side stones with a hidden heart detail beneath the centre stone — a secret only you two will know.',
  },
  {
    name: 'Hidden Cluster Halo Diamond Engagement Ring',
    category: 'cluster-halo', style: 'cluster', type: 'ring', tag: '', basePrice: 11509,
    metals: ['yellow-gold', 'white-gold', 'platinum'],
    shapes: ['emerald'],
    img: 'https://ecksand.com/cdn/shop/files/45610_p_14961257120112_img_66500058677616_hidden-cluster-halo-diamond-engagement-ring.png',
    images: [
      'https://ecksand.com/cdn/shop/files/45610_p_14961257120112_img_66500058677616_hidden-cluster-halo-diamond-engagement-ring.png',
      'https://ecksand.com/cdn/shop/files/43668_p_14624095011184_img_67122937168240_hidden-diamond-halo-engagement-ring.png',
      'https://ecksand.com/cdn/shop/files/ecksand-45608-y-7.36-ring.png',
    ],
    modelUrl: 'https://images.hinex.store/1777702007052-diamond_engagement_ring.glb',
    priceGroup: 'over10000', collection: 'engagement', slug: 'hidden-cluster-halo',
    description: 'A breathtaking cluster halo wrapping an emerald-cut centre stone — maximum sparkle, minimum weight.',
  },
  {
    name: 'Diamond Engagement Ring with Cathedral Setting and Hidden Diamond',
    category: 'cathedral', style: 'solitaire', type: 'ring', tag: '', basePrice: 3681,
    metals: ['yellow-gold', 'white-gold', 'rose-gold', 'platinum'],
    shapes: ['oval', 'round', 'pear', 'emerald', 'cushion', 'princess'],
    img: 'https://ecksand.com/cdn/shop/files/ecksand-30958-y-1.00-oval-diamond-ring_3790eef0-ed8c-4e51-b1c8-7d0081e01a2a.png',
    images: [
      'https://ecksand.com/cdn/shop/files/ecksand-30958-y-1.00-oval-diamond-ring_3790eef0-ed8c-4e51-b1c8-7d0081e01a2a.png',
      'https://ecksand.com/cdn/shop/files/ecksand-45608-y-7.36-ring.png',
    ],
    priceGroup: '3000-5000', collection: 'engagement', slug: 'cathedral-hidden-diamond',
    description: 'Cathedral arches frame a brilliant centre stone above a hidden accent diamond — a refined homage to classical jewellery architecture.',
  },
  {
    name: 'Hidden Diamond Halo Engagement Ring',
    category: 'hidden-halo', style: 'halo', type: 'ring', tag: 'Popular', basePrice: 3184,
    metals: ['yellow-gold', 'white-gold', 'rose-gold', 'platinum'],
    shapes: ['round', 'oval', 'pear', 'marquise', 'princess', 'cushion'],
    img: 'https://ecksand.com/cdn/shop/files/43668_p_14624095011184_img_67122937168240_hidden-diamond-halo-engagement-ring.png',
    images: [
      'https://ecksand.com/cdn/shop/files/43668_p_14624095011184_img_67122937168240_hidden-diamond-halo-engagement-ring.png',
      'https://ecksand.com/cdn/shop/files/45610_p_14961257120112_img_66500058677616_hidden-cluster-halo-diamond-engagement-ring.png',
      'https://ecksand.com/cdn/shop/files/ecksand-30958-y-1.00-oval-diamond-ring_3790eef0-ed8c-4e51-b1c8-7d0081e01a2a.png',
    ],
    priceGroup: '3000-5000', collection: 'engagement', slug: 'hidden-diamond-halo',
    description: 'A delicate halo tucked beneath the centre stone for subtle, enchanting sparkle visible only from the side.',
  },
  {
    name: 'Black Onyx & Diamond Halo Ring',
    category: 'statement', style: 'halo', type: 'ring', tag: 'Exclusive', basePrice: 8500,
    metals: ['white-gold', 'platinum'],
    shapes: ['oval'],
    img: 'https://ecksand.com/cdn/shop/files/ecksand-45608-y-7.36-ring.png',
    images: [
      'https://ecksand.com/cdn/shop/files/ecksand-45608-y-7.36-ring.png'
    ],
    modelUrl: 'https://images.hinex.store/1777663850391-ring_with_big_black_stone_and_diamond.glb',
    priceGroup: '5000-10000', collection: 'engagement', slug: 'black-onyx-diamond-halo',
    description: 'A striking black onyx centre stone surrounded by a brilliant diamond halo, creating a bold and sophisticated statement piece.',
  },
  {
    name: 'Classic Half-Round Wedding Band',
    category: 'wedding-band', style: 'plain', type: 'ring', tag: 'Timeless', basePrice: 850,
    metals: ['yellow-gold', 'white-gold', 'rose-gold', 'platinum'],
    shapes: ['polished'],
    img: 'https://ecksand.com/cdn/shop/products/6050-w-4mm-face.png?v=1677873847',
    images: [
      'https://ecksand.com/cdn/shop/products/6050-w-4mm-face.png?v=1677873847',
      'https://ecksand.com/cdn/shop/products/ecksand-wedding-21745-w-ring_e06b42dc-8f50-4350-9427-183c63cfbbe0.png?v=1689172386',
    ],
    priceGroup: 'under3000', collection: 'wedding', slug: 'classic-half-round-band',
    description: 'A timeless half-round profile handcrafted in recycled 18k gold — comfort-fit inside, polished mirror outside.',
  },
  {
    name: 'Shared-Prong Diamond Eternity Band',
    category: 'eternity-band', style: 'eternity', type: 'ring', tag: 'Luxury', basePrice: 3200,
    metals: ['white-gold', 'platinum'],
    shapes: ['round'],
    img: 'https://ecksand.com/cdn/shop/products/ecksand-wedding-21745-w-ring_e06b42dc-8f50-4350-9427-183c63cfbbe0.png?v=1689172386',
    images: [
      'https://ecksand.com/cdn/shop/products/ecksand-wedding-21745-w-ring_e06b42dc-8f50-4350-9427-183c63cfbbe0.png?v=1689172386',
      'https://ecksand.com/cdn/shop/products/6050-w-4mm-face.png?v=1677873847',
    ],
    priceGroup: '3000-5000', collection: 'wedding', slug: 'shared-prong-eternity-band',
    description: 'Brilliant diamonds encircle the finger in a classic shared-prong setting — timeless elegance that catches light from every angle.',
  },
  {
    name: 'Love Knot Diamond Pendant Necklace',
    category: 'love-knot', style: 'pendant', type: 'necklace', tag: 'Elegant', basePrice: 1850,
    metals: ['yellow-gold', 'white-gold', 'rose-gold'],
    shapes: ['round'],
    img: 'https://ecksand.com/cdn/shop/files/ecksand-42171-y-1.png',
    images: ['https://ecksand.com/cdn/shop/files/ecksand-42171-y-1.png'],
    priceGroup: 'under3000', collection: 'all', slug: 'love-knot-pendant',
    description: 'A delicate love knot pendant suspended from a recycled gold chain.',
  },
  {
    name: 'Classic Solitaire Diamond Necklace',
    category: 'solitaire', style: 'pendant', type: 'necklace', tag: 'Timeless', basePrice: 2400,
    metals: ['white-gold', 'platinum'],
    shapes: ['round'],
    img: 'https://ecksand.com/cdn/shop/files/ecksand-00101-w-1.png',
    images: ['https://ecksand.com/cdn/shop/files/ecksand-00101-w-1.png'],
    priceGroup: 'under3000', collection: 'all', slug: 'solitaire-necklace',
    description: 'A single brilliant diamond held in a refined four-prong setting.',
  },
  {
    name: 'Diamond Cluster Stud Earrings',
    category: 'cluster', style: 'stud', type: 'earring', tag: 'Sparkle', basePrice: 1500,
    metals: ['yellow-gold', 'white-gold'],
    shapes: ['round'],
    img: 'https://ecksand.com/cdn/shop/files/ecksand-41123-y-1.png',
    images: ['https://ecksand.com/cdn/shop/files/ecksand-41123-y-1.png'],
    priceGroup: 'under3000', collection: 'all', slug: 'cluster-studs',
    description: 'Clusters of brilliant diamonds designed for everyday luxury.',
  },
  {
    name: 'Hammered Gold Hoop Earrings',
    category: 'statement', style: 'hoop', type: 'earring', tag: 'Artisan', basePrice: 950,
    metals: ['yellow-gold', 'rose-gold'],
    shapes: ['hammered'],
    img: 'https://ecksand.com/cdn/shop/files/ecksand-hoops-y-1.png',
    images: ['https://ecksand.com/cdn/shop/files/ecksand-hoops-y-1.png'],
    priceGroup: 'under3000', collection: 'all', slug: 'hammered-hoops',
    description: 'Handcrafted hoops with a unique hammered texture in recycled gold.',
  },
];

async function seed() {
  try {
    await sequelize.authenticate();
    console.log('🌱 Seeding products...');

    // Load all masters into memory for quick lookup
    const [collections, types, categories, styles, priceGroups, metals, shapes] = await Promise.all([
      Collection.findAll(), ProductType.findAll(), Category.findAll(),
      Style.findAll(), PriceGroup.findAll(), Metal.findAll(), Shape.findAll()
    ]);

    for (const p of MOCK_PRODUCTS) {
      const collection = collections.find(c => c.slug === p.collection);
      const type = types.find(t => t.slug === p.type);
      const category = categories.find(c => c.slug === p.category);
      const style = styles.find(s => s.slug === p.style);
      const priceGroup = priceGroups.find(pg => pg.slug === p.priceGroup);

      if (!collection || !type || !category || !style || !priceGroup) {
        console.warn(`⚠️ Skipping ${p.name}: Missing master data mapping.`);
        continue;
      }

      const [product] = await Product.findOrCreate({
        where: { slug: p.slug },
        defaults: {
          name: p.name,
          description: p.description,
          basePrice: p.basePrice,
          tag: p.tag,
          collectionId: collection.id,
          typeId: type.id,
          categoryId: category.id,
          styleId: style.id,
          priceGroupId: priceGroup.id,
        }
      });

      // ── Media ────────────────────────────────────────────────
      // Primary image
      await ProductMedia.findOrCreate({
        where: { productId: product.id, url: p.img },
        defaults: { mediaType: 'image', isPrimary: true, alt: p.name }
      });

      // Gallery images
      for (let i = 0; i < p.images.length; i++) {
        await ProductMedia.findOrCreate({
          where: { productId: product.id, url: p.images[i] },
          defaults: { mediaType: 'image', isPrimary: false, sortOrder: i + 1, alt: p.name }
        });
      }

      // Metal variant images
      if (p.metalImages) {
        for (const [mCode, mUrl] of Object.entries(p.metalImages)) {
          const metal = metals.find(m => m.code === mCode);
          if (metal) {
            await ProductMedia.findOrCreate({
              where: { productId: product.id, url: mUrl, metalId: metal.id },
              defaults: { mediaType: 'image', isPrimary: false, alt: `${p.name} - ${metal.name}` }
            });
          }
        }
      }

      // 3D Model
      if (p.modelUrl) {
        await ProductMedia.findOrCreate({
          where: { productId: product.id, url: p.modelUrl },
          defaults: { mediaType: '3d_model', isPrimary: false, alt: `${p.name} 3D Model` }
        });
      }

      // ── Junctions ─────────────────────────────────────────────
      // Metals
      for (const mCode of p.metals) {
        const metal = metals.find(m => m.code === mCode);
        if (metal) {
          await ProductMetal.findOrCreate({ where: { productId: product.id, metalId: metal.id } });
        }
      }

      // Shapes
      for (const sSlug of p.shapes) {
        const shape = shapes.find(s => s.slug === sSlug);
        if (shape) {
          await ProductShape.findOrCreate({ where: { productId: product.id, shapeId: shape.id } });
        }
      }
    }

    console.log('✅ Products seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Product seed failed:', err);
    process.exit(1);
  }
}

seed();
