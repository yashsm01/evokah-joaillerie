import { Injectable, signal } from '@angular/core';

export type Lang = 'en' | 'fr';

export interface Translations {
  // Header / Nav
  nav_collections: string;
  nav_engagement:  string;
  nav_wedding:     string;
  nav_story:       string;
  nav_atelier:     string;
  nav_search_placeholder: string;
  announcement:    string;

  // Collection page
  col_filter_all:      string;
  col_filter_style:    string;
  col_filter_metal:    string;
  col_filter_price:    string;
  col_quick_view:      string;
  col_add_cart:        string;
  col_from:            string;

  // Cart
  cart_title:          string;
  cart_empty:          string;
  cart_subtotal:       string;
  cart_checkout:       string;
  cart_continue:       string;

  // Story
  story_hero_eyebrow:  string;
  story_hero_title:    string;
  story_cta_title:     string;

  // Footer
  footer_shop:         string;
  footer_help:         string;
  footer_atelier:      string;
  footer_visit:        string;
  footer_rights:       string;
}

const EN: Translations = {
  nav_collections: 'Collections',
  nav_engagement:  'Engagement',
  nav_wedding:     'Wedding',
  nav_story:       'Our Story',
  nav_atelier:     'Atelier',
  nav_search_placeholder: 'Search rings, gemstones, styles…',
  announcement:    '✦ Complimentary shipping on all orders | Book a private consultation | Ethical & sustainable jewellery ✦',

  col_filter_all:  'All',
  col_filter_style: 'Style',
  col_filter_metal: 'Metal',
  col_filter_price: 'Price',
  col_quick_view:  'Quick View',
  col_add_cart:    'Add to Cart',
  col_from:        'From',

  cart_title:      'Your Cart',
  cart_empty:      'Your cart is empty',
  cart_subtotal:   'Subtotal',
  cart_checkout:   'Proceed to Checkout',
  cart_continue:   'Continue Shopping',

  story_hero_eyebrow: 'Our Story',
  story_hero_title:   'Emotion Shaped Through Intention',
  story_cta_title:    'Ready to Create Something Forever?',

  footer_shop:     'Shop',
  footer_help:     'Help',
  footer_atelier:  'Atelier',
  footer_visit:    'Visit Us',
  footer_rights:   'All rights reserved.',
};

const FR: Translations = {
  nav_collections: 'Collections',
  nav_engagement:  'Fiançailles',
  nav_wedding:     'Mariage',
  nav_story:       'Notre Histoire',
  nav_atelier:     'Atelier',
  nav_search_placeholder: 'Rechercher bagues, pierres, styles…',
  announcement:    '✦ Livraison offerte sur toutes les commandes | Consultation privée disponible | Joaillerie éthique & durable ✦',

  col_filter_all:  'Tout',
  col_filter_style: 'Style',
  col_filter_metal: 'Métal',
  col_filter_price: 'Prix',
  col_quick_view:  'Aperçu rapide',
  col_add_cart:    'Ajouter au panier',
  col_from:        'À partir de',

  cart_title:      'Votre Panier',
  cart_empty:      'Votre panier est vide',
  cart_subtotal:   'Sous-total',
  cart_checkout:   'Passer à la caisse',
  cart_continue:   'Continuer les achats',

  story_hero_eyebrow: 'Notre Histoire',
  story_hero_title:   'L\'Émotion Façonnée par l\'Intention',
  story_cta_title:    'Prêt à Créer Quelque Chose d\'Éternel ?',

  footer_shop:     'Boutique',
  footer_help:     'Aide',
  footer_atelier:  'Atelier',
  footer_visit:    'Nous Visiter',
  footer_rights:   'Tous droits réservés.',
};

@Injectable({ providedIn: 'root' })
export class LangService {
  private _lang   = signal<Lang>('en');
  readonly lang   = this._lang.asReadonly();

  private _dict   = signal<Translations>(EN);
  readonly t      = this._dict.asReadonly();

  toggle(): void {
    const next = this._lang() === 'en' ? 'fr' : 'en';
    this._lang.set(next);
    this._dict.set(next === 'fr' ? FR : EN);
    document.documentElement.setAttribute('lang', next);
  }

  setLang(lang: Lang): void {
    this._lang.set(lang);
    this._dict.set(lang === 'fr' ? FR : EN);
    document.documentElement.setAttribute('lang', lang);
  }
}
