import { Product } from '../models/product.model';

export const MOCK_PRODUCTS: Product[] = [
  // --- ENGAGEMENT RINGS ---
  {
    id: 1, name: 'Love Knot Bezel-Set Yellow Diamond Engagement Ring',
    category: 'Love Knot', style: 'knot', type: 'ring', tag: 'New Arrival', basePrice: 12660,
    metals: ['yellow-gold'], shapes: ['Lab-grown', 'Natural'],
    img: 'https://ecksand.com/cdn/shop/files/45609_p_14961261576560_img_66500335403376_love-knot-bezel-set-yellow-diamond-engagement-ring.png',
    priceGroup: 'over10000', collection: 'engagement', slug: 'love-knot-bezel-set-yellow-diamond',
    description: 'A stunning love knot silhouette with bezel-set yellow diamonds in recycled 18k gold.',
  },
  {
    id: 2, name: 'Diamond Engagement Ring with Side Diamonds and Secret Heart',
    category: 'Secret Heart', style: 'halo', type: 'ring', tag: 'Bestseller', basePrice: 6471,
    metals: ['yellow-gold', 'white-gold', 'rose-gold', 'platinum'], shapes: ['Oval'],
    img: 'https://ecksand.com/cdn/shop/files/ecksand-45608-y-7.36-ring.png',
    priceGroup: '5000-10000', collection: 'engagement', slug: 'secret-heart-side-diamonds',
    description: 'An oval diamond flanked by side stones with a hidden heart detail.',
  },
  {
    id: 3, name: 'Hidden Cluster Halo Diamond Engagement Ring',
    category: 'Cluster Halo', style: 'cluster', type: 'ring', tag: '', basePrice: 11509,
    metals: ['yellow-gold', 'white-gold', 'platinum'], shapes: ['Emerald'],
    img: 'https://ecksand.com/cdn/shop/files/45610_p_14961257120112_img_66500058677616_hidden-cluster-halo-diamond-engagement-ring.png',
    priceGroup: 'over10000', collection: 'engagement', slug: 'hidden-cluster-halo',
    description: 'A breathtaking cluster halo wrapping an emerald-cut centre stone.',
  },
  {
    id: 4, name: 'Diamond Engagement Ring with Cathedral Setting and Hidden Diamond',
    category: 'Cathedral', style: 'solitaire', type: 'ring', tag: '', basePrice: 3681,
    metals: ['yellow-gold', 'white-gold', 'rose-gold', 'platinum'],
    shapes: ['Oval', 'Round', 'Pear', 'Emerald', 'Cushion', 'Princess'],
    img: 'https://ecksand.com/cdn/shop/files/ecksand-30958-y-1.00-oval-diamond-ring_3790eef0-ed8c-4e51-b1c8-7d0081e01a2a.png',
    priceGroup: '3000-5000', collection: 'engagement', slug: 'cathedral-hidden-diamond',
    description: 'Cathedral arches frame a brilliant centre stone above a hidden accent diamond.',
  },
  {
    id: 5, name: 'Hidden Diamond Halo Engagement Ring',
    category: 'Hidden Halo', style: 'halo', type: 'ring', tag: 'Popular', basePrice: 3184,
    metals: ['yellow-gold', 'white-gold', 'rose-gold', 'platinum'],
    shapes: ['Round', 'Oval', 'Pear', 'Marquise', 'Princess', 'Cushion'],
    img: 'https://ecksand.com/cdn/shop/files/43668_p_14624095011184_img_67122937168240_hidden-diamond-halo-engagement-ring.png',
    priceGroup: '3000-5000', collection: 'engagement', slug: 'hidden-diamond-halo',
    description: 'A delicate halo tucked beneath the centre stone for subtle, enchanting sparkle.',
  },

  // --- WEDDING BANDS ---
  {
    id: 101, name: 'Classic Half-Round Wedding Band',
    category: 'Wedding Band', style: 'plain', type: 'ring', tag: 'Timeless', basePrice: 850,
    metals: ['yellow-gold', 'white-gold', 'rose-gold', 'platinum'], shapes: ['Polished'],
    img: 'https://ecksand.com/cdn/shop/products/6050-w-4mm-face.png?v=1677873847',
    priceGroup: 'under3000', collection: 'wedding', slug: 'classic-half-round-band',
    description: 'A timeless half-round profile handcrafted in recycled 18k gold.',
  },
  {
    id: 102, name: 'Shared-Prong Diamond Eternity Band',
    category: 'Eternity Band', style: 'eternity', type: 'ring', tag: 'Luxury', basePrice: 3200,
    metals: ['white-gold', 'platinum'], shapes: ['Round'],
    img: 'https://ecksand.com/cdn/shop/products/ecksand-wedding-21745-w-ring_e06b42dc-8f50-4350-9427-183c63cfbbe0.png?v=1689172386',
    priceGroup: '3000-5000', collection: 'wedding', slug: 'shared-prong-eternity-band',
    description: 'Brilliant diamonds encircle the finger in a classic shared-prong setting.',
  },

  // --- NECKLACES ---
  {
    id: 201, name: 'Love Knot Diamond Pendant Necklace',
    category: 'Love Knot', style: 'pendant', type: 'necklace', tag: 'Elegant', basePrice: 1850,
    metals: ['yellow-gold', 'white-gold', 'rose-gold'], shapes: ['Round'],
    img: 'https://ecksand.com/cdn/shop/files/ecksand-42171-y-1.png',
    priceGroup: 'under3000', collection: 'all', slug: 'love-knot-pendant',
    description: 'A delicate love knot pendant suspended from a recycled gold chain.',
  },
  {
    id: 202, name: 'Classic Solitaire Diamond Necklace',
    category: 'Solitaire', style: 'pendant', type: 'necklace', tag: 'Timeless', basePrice: 2400,
    metals: ['white-gold', 'platinum'], shapes: ['Round'],
    img: 'https://ecksand.com/cdn/shop/files/ecksand-00101-w-1.png',
    priceGroup: 'under3000', collection: 'all', slug: 'solitaire-necklace',
    description: 'A single brilliant diamond held in a refined four-prong setting.',
  },

  // --- EARRINGS ---
  {
    id: 301, name: 'Diamond Cluster Stud Earrings',
    category: 'Cluster', style: 'stud', type: 'earring', tag: 'Sparkle', basePrice: 1500,
    metals: ['yellow-gold', 'white-gold'], shapes: ['Round'],
    img: 'https://ecksand.com/cdn/shop/files/ecksand-41123-y-1.png',
    priceGroup: 'under3000', collection: 'all', slug: 'cluster-studs',
    description: 'Clusters of brilliant diamonds designed for everyday luxury.',
  },
  {
    id: 302, name: 'Hammered Gold Hoop Earrings',
    category: 'Classic', style: 'hoop', type: 'earring', tag: 'Artisan', basePrice: 950,
    metals: ['yellow-gold', 'rose-gold'], shapes: ['Hammered'],
    img: 'https://ecksand.com/cdn/shop/files/ecksand-hoops-y-1.png',
    priceGroup: 'under3000', collection: 'all', slug: 'hammered-hoops',
    description: 'Handcrafted hoops with a unique hammered texture in recycled gold.',
  },
];
