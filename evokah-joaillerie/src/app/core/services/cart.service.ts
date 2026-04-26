import { Injectable, signal, computed } from '@angular/core';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  img: string;
  metal: string;
  qty: number;
  category: string;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private _items = signal<CartItem[]>([]);

  readonly items = this._items.asReadonly();
  readonly count = computed(() => this._items().reduce((s, i) => s + i.qty, 0));
  readonly total = computed(() => this._items().reduce((s, i) => s + i.price * i.qty, 0));

  addItem(item: Omit<CartItem, 'qty'>): void {
    this._items.update(items => {
      const existing = items.find(i => i.id === item.id && i.metal === item.metal);
      if (existing) {
        return items.map(i =>
          i.id === item.id && i.metal === item.metal ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...items, { ...item, qty: 1 }];
    });
  }

  removeItem(id: number, metal: string): void {
    this._items.update(items => items.filter(i => !(i.id === id && i.metal === metal)));
  }

  updateQty(id: number, metal: string, delta: number): void {
    this._items.update(items =>
      items
        .map(i => i.id === id && i.metal === metal ? { ...i, qty: i.qty + delta } : i)
        .filter(i => i.qty > 0)
    );
  }

  clear(): void {
    this._items.set([]);
  }

  formatPrice(n: number): string {
    return '$' + n.toLocaleString('en-CA') + ' CAD';
  }
}
