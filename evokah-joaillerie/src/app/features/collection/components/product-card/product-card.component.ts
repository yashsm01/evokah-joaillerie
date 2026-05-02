import { Component, Input, Output, EventEmitter, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Product, METAL_LABELS, MetalType } from '../../../../core/models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() quickView = new EventEmitter<Product>();
  @Output() addedToWishlist = new EventEmitter<Product>();

  private router = inject(Router);
  metalLabels = METAL_LABELS;

  navigateToDetail(): void {
    if (this.product.slug) {
      this.router.navigate(['/product', this.product.slug]);
    }
  }

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
