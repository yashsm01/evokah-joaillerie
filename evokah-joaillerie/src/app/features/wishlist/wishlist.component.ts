import { Component, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WishlistService } from '../../core/services/wishlist.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent {
  wishSvc = inject(WishlistService);
  cartSvc = inject(CartService);

  imageIndexes: Record<string | number, number> = {};

  getItemImage(item: any): string {
    const idx = this.imageIndexes[item.id] || 0;
    if (item.images?.length) return item.images[idx];
    return item.img;
  }

  nextImage(item: any, e: Event): void {
    e.stopPropagation();
    if (!item.images?.length) return;
    const current = this.imageIndexes[item.id] || 0;
    this.imageIndexes[item.id] = (current + 1) % item.images.length;
  }

  prevImage(item: any, e: Event): void {
    e.stopPropagation();
    if (!item.images?.length) return;
    const current = this.imageIndexes[item.id] || 0;
    this.imageIndexes[item.id] = (current - 1 + item.images.length) % item.images.length;
  }

  toastMsg     = '';
  toastVisible = false;

  moveToCart(item: ReturnType<typeof this.wishSvc.items>[0]): void {
    this.cartSvc.addItem({
      id:       item.id,
      name:     item.name,
      price:    item.basePrice,
      img:      item.img,
      metal:    item.metal,
      category: item.category,
    });
    this.wishSvc.remove(item.id);
    this.showToast(`${item.name} moved to cart`);
  }

  remove(id: string | number): void {
    this.wishSvc.remove(id);
  }

  clearAll(): void {
    this.wishSvc.clear();
  }

  showToast(msg: string): void {
    this.toastMsg     = msg;
    this.toastVisible = true;
    setTimeout(() => (this.toastVisible = false), 3000);
  }
}
