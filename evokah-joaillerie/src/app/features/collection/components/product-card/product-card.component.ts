import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product, METAL_LABELS, MetalType } from '../../../../core/models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() quickView = new EventEmitter<Product>();
  @Output() addedToWishlist = new EventEmitter<Product>();

  metalLabels = METAL_LABELS;

  onQuickView(e: Event): void {
    e.stopPropagation();
    this.quickView.emit(this.product);
  }
  onWishlist(e: Event): void {
    e.stopPropagation();
    this.addedToWishlist.emit(this.product);
  }
  formatPrice(n: number): string {
    return '$' + n.toLocaleString('en-CA') + ' CAD';
  }
}
