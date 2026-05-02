import {
  Component, OnInit, inject, signal, computed, CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { Product, MetalType, METAL_LABELS } from '../../core/models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],   // allows <model-viewer>
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  private svc    = inject(ProductService);
  private wish   = inject(WishlistService);
  private route  = inject(ActivatedRoute);
  private router = inject(Router);

  product        = signal<Product | null>(null);
  selectedMetal  = signal<MetalType | null>(null);
  selectedShape  = signal<string>('');
  selectedImage  = signal<string>('');
  viewMode       = signal<'image' | 'model'>('image');
  qty            = signal(1);
  addedToCart    = signal(false);
  toastMsg       = signal('');
  toastVisible   = signal(false);
  ringSize       = signal('');
  activeTab      = signal<'desc' | 'details' | 'care'>('desc');

  readonly METAL_LABELS = METAL_LABELS;

  /** Gallery images for the currently selected metal */
  gallery = computed<string[]>(() => {
    const p = this.product();
    if (!p) return [];
    const metal = this.selectedMetal();
    // per-metal gallery
    if (metal && p.metalGalleries?.[metal]?.length) return p.metalGalleries[metal]!;
    // fallback to generic gallery
    if (p.images?.length) return p.images;
    return [p.img];
  });

  /** Main displayed image */
  mainImage = computed(() => {
    const m = this.selectedMetal();
    const p = this.product();
    if (!p) return '';
    if (m && p.metalImages?.[m]) return p.metalImages[m]!;
    return this.selectedImage() || p.img;
  });

  /** Computed price based on metal */
  displayPrice = computed(() => {
    const p  = this.product();
    if (!p) return 0;
    const m = this.selectedMetal();
    const premium: Record<MetalType, number> = {
      'yellow-gold': 0, 'white-gold': 200, 'rose-gold': 100, 'platinum': 600
    };
    return p.basePrice + (m ? (premium[m] ?? 0) : 0);
  });

  isWishlisted = computed(() => {
    const p = this.product();
    return p ? this.wish.isInWishlist(p.id) : false;
  });

  ngOnInit() {
    this.route.paramMap.subscribe(pm => {
      const slug = pm.get('slug');
      if (!slug) { this.router.navigate(['/']); return; }
      const p = this.svc.getBySlug(slug);
      if (!p) { this.router.navigate(['/']); return; }
      this.product.set(p);
      this.selectedMetal.set(p.metals[0] ?? null);
      this.selectedShape.set(p.shapes[0] ?? '');
      this.selectedImage.set(p.img);
    });
  }

  selectMetal(m: MetalType) {
    this.selectedMetal.set(m);
    // reset selected image to the metal-specific one
    const p = this.product();
    if (p?.metalImages?.[m]) this.selectedImage.set(p.metalImages[m]!);
    else this.selectedImage.set(p?.img ?? '');
  }

  selectGalleryImage(img: string) { this.selectedImage.set(img); }

  toggleWishlist() {
    const p = this.product();
    if (!p) return;
    this.wish.toggle({
      id: p.id,
      name: p.name,
      img: this.mainImage(),
      basePrice: this.displayPrice(),
      category: p.category,
      tag: p.tag,
      metal: this.selectedMetal() ?? p.metals[0] ?? '',
      collection: p.collection,
    });
    this.showToast(this.isWishlisted() ? 'Added to wishlist' : 'Removed from wishlist');
  }

  addToCart() {
    this.addedToCart.set(true);
    this.showToast('Added to cart ✓');
    setTimeout(() => this.addedToCart.set(false), 2000);
  }

  changeQty(delta: number) {
    this.qty.update(q => Math.max(1, q + delta));
  }

  showToast(msg: string) {
    this.toastMsg.set(msg);
    this.toastVisible.set(true);
    setTimeout(() => this.toastVisible.set(false), 2500);
  }

  metalLabel(m: MetalType): string { return METAL_LABELS[m]; }

  get relatedProducts(): Product[] {
    const p = this.product();
    if (!p) return [];
    return this.svc.getAll()
      .filter(x => x.id !== p.id && (x.style === p.style || x.collection === p.collection))
      .slice(0, 4);
  }

  navigateTo(slug: string | undefined) {
    if (slug) this.router.navigate(['/product', slug]);
  }
}
