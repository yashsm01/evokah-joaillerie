import { Routes } from '@angular/router';

const collection = () =>
  import('./features/collection/collection.component').then(m => m.CollectionComponent);

const cart = () =>
  import('./features/cart/cart.component').then(m => m.CartComponent);

const story = () =>
  import('./features/story/story.component').then(m => m.StoryComponent);

export const routes: Routes = [

  // ── Theme-prefixed routes  /:theme/:page ──────────────────────
  { path: ':theme/engagement', loadComponent: collection },
  { path: ':theme/wedding',    loadComponent: collection },
  { path: ':theme/cart',       loadComponent: cart       },
  { path: ':theme/story',      loadComponent: story      },
  { path: ':theme/wishlist',   loadComponent: () => import('./features/wishlist/wishlist.component').then(m => m.WishlistComponent) },
  { path: ':theme/shop',       loadComponent: collection },
  { path: ':theme/home',       loadComponent: collection },  // home with theme

  // ── Standard routes (no theme prefix) ───────────────────────
  { path: '',           loadComponent: collection },
  { path: 'engagement', loadComponent: collection },
  { path: 'wedding',    loadComponent: collection },
  { path: 'cart',       loadComponent: cart       },
  { path: 'story',      loadComponent: story      },
  { path: 'wishlist',   loadComponent: () => import('./features/wishlist/wishlist.component').then(m => m.WishlistComponent) },
  { path: 'shop',       loadComponent: collection },

  { path: '**', redirectTo: '' },
];
