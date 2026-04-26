import { Component, Input, Output, EventEmitter, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product, METAL_LABELS, MetalType } from '../../../../core/models/product.model';
import { CartService } from '../../../../core/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss'],
})
export class ProductModalComponent {
  private _product: Product | null = null;

  @Input()
  set product(p: Product | null) {
    this._product = p;
    // Auto-select first metal when product changes
    if (p?.metals?.length) {
      this.selectedMetal.set(p.metals[0]);
    }
  }
  get product(): Product | null { return this._product; }

  @Output() closed = new EventEmitter<void>();
  @Output() toast  = new EventEmitter<string>();

  metalLabels = METAL_LABELS;
  selectedMetal = signal<MetalType | null>(null);
  selectedShape = signal<string | null>(null);

  private cart   = inject(CartService);
  private router = inject(Router);

  /** Returns the correct image for the currently selected metal */
  activeImage = computed(() => {
    const p = this._product;
    const m = this.selectedMetal();
    if (!p) return '';
    if (m && p.metalImages?.[m]) return p.metalImages[m]!;
    return p.img;
  });

  selectMetal(m: MetalType): void { this.selectedMetal.set(m); }
  selectShape(s: string): void    { this.selectedShape.set(s); }

  addToCart(): void {
    if (!this._product) return;
    const metal = this.selectedMetal() ?? this._product.metals[0];
    this.cart.addItem({
      id:       this._product.id,
      name:     this._product.name,
      price:    this._product.basePrice,
      img:      this.activeImage(),
      metal:    METAL_LABELS[metal] ?? metal,
      category: this._product.category,
    });
    this.toast.emit(`✓ Added to cart`);
    this.closed.emit();
  }

  goToCart(): void {
    this.addToCart();
    this.router.navigate(['/cart']);
  }

  formatPrice(n: number): string {
    return '$' + n.toLocaleString('en-CA') + ' CAD';
  }
}
