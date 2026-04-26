import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/collection/collection.component').then(m => m.CollectionComponent),
  },
  {
    path: 'engagement',
    loadComponent: () =>
      import('./features/collection/collection.component').then(m => m.CollectionComponent),
  },
  {
    path: 'wedding',
    loadComponent: () =>
      import('./features/collection/collection.component').then(m => m.CollectionComponent),
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./features/cart/cart.component').then(m => m.CartComponent),
  },
  { path: '**', redirectTo: '' },
];
