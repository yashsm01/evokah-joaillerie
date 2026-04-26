import { Injectable, signal, computed } from '@angular/core';

export interface WishlistItem {
  id:       number;
  name:     string;
  basePrice: number;
  img:      string;
  category: string;
  tag?:     string;
  metal:    string;
  collection: 'engagement' | 'wedding' | 'all';
}

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private _items = signal<WishlistItem[]>([]);

  readonly items = this._items.asReadonly();
  readonly count = computed(() => this._items().length);

  isInWishlist(id: number): boolean {
    return this._items().some(i => i.id === id);
  }

  toggle(item: WishlistItem): void {
    const exists = this.isInWishlist(item.id);
    if (exists) {
      this._items.update(list => list.filter(i => i.id !== item.id));
    } else {
      this._items.update(list => [...list, item]);
    }
  }

  remove(id: number): void {
    this._items.update(list => list.filter(i => i.id !== id));
  }

  clear(): void {
    this._items.set([]);
  }

  formatPrice(n: number): string {
    return '$' + n.toLocaleString('en-CA') + ' CAD';
  }
}
