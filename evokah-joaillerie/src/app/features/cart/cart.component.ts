import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  cart = inject(CartService);

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
}
