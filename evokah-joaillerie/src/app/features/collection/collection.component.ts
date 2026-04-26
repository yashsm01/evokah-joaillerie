import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { Product, ProductFilters, ProductStyle, MetalType, PriceGroup, SortOption } from '../../core/models/product.model';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductModalComponent } from './components/product-modal/product-modal.component';

const ENGAGEMENT_STYLES: { label: string; value: ProductStyle | 'all' }[] = [
  { label: 'All Rings', value: 'all' },
  { label: 'Solitaire',  value: 'solitaire' },
  { label: 'Halo',       value: 'halo' },
  { label: 'Pavé',       value: 'pave' },
  { label: 'Love Knot',  value: 'knot' },
  { label: 'Cluster',    value: 'cluster' },
];

const WEDDING_STYLES: { label: string; value: ProductStyle | 'all' }[] = [
  { label: 'All Bands',  value: 'all' },
  { label: 'Plain',      value: 'plain' },
  { label: 'Eternity',   value: 'eternity' },
  { label: 'Patterned',  value: 'patterned' },
  { label: 'Contour',    value: 'contour' },
  { label: 'Pavé',       value: 'pave' },
];

@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardComponent, ProductModalComponent],
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
})
export class CollectionComponent implements OnInit {
  private svc = inject(ProductService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  collectionType = signal<'engagement' | 'wedding'>('engagement');
  allProducts: Product[] = [];
  selectedProduct: Product | null = null;
  isListMode = false;
  toastMsg = '';
  toastVisible = false;

  stylePills = computed(() =>
    this.collectionType() === 'engagement' ? ENGAGEMENT_STYLES : WEDDING_STYLES
  );

  filters = signal<ProductFilters>({
    style: 'all',
    metal: 'all',
    priceGroup: 'all',
    sort: 'featured',
  });

  filteredProducts = computed(() => {
    const f = this.filters();
    const type = this.collectionType();
    let list = this.allProducts.filter(p => {
      if (p.collection !== type) return false;
      if (f.style !== 'all' && p.style !== f.style) return false;
      if (f.metal !== 'all' && !p.metals.includes(f.metal as MetalType)) return false;
      if (f.priceGroup !== 'all' && p.priceGroup !== f.priceGroup) return false;
      return true;
    });
    if (f.sort === 'price-asc')  list = [...list].sort((a,b) => a.basePrice - b.basePrice);
    if (f.sort === 'price-desc') list = [...list].sort((a,b) => b.basePrice - a.basePrice);
    if (f.sort === 'name-asc')   list = [...list].sort((a,b) => a.name.localeCompare(b.name));
    return list;
  });

  ngOnInit() {
    // Detect collection from URL
    this.route.url.subscribe(url => {
      const path = url[0]?.path || '';
      this.collectionType.set(path === 'wedding' ? 'wedding' : 'engagement');
      this.resetFilters();
    });

    this.svc.getProducts().subscribe(p => {
      this.allProducts = p;
    });
  }

  setStyle(v: ProductStyle | 'all') {
    this.filters.update(f => ({ ...f, style: v }));
  }
  setMetal(v: string) {
    this.filters.update(f => ({ ...f, metal: v as MetalType | 'all' }));
  }
  setPriceGroup(v: string) {
    this.filters.update(f => ({ ...f, priceGroup: v as PriceGroup | 'all' }));
  }
  setSort(v: string) {
    this.filters.update(f => ({ ...f, sort: v as SortOption }));
  }
  resetFilters() {
    this.filters.set({ style: 'all', metal: 'all', priceGroup: 'all', sort: 'featured' });
  }

  openModal(p: Product)  { this.selectedProduct = p; document.body.style.overflow = 'hidden'; }
  closeModal()            { this.selectedProduct = null; document.body.style.overflow = ''; }

  showToast(msg: string) {
    this.toastMsg = msg;
    this.toastVisible = true;
    setTimeout(() => this.toastVisible = false, 3000);
  }

  toggleView(list: boolean) { this.isListMode = list; }

  scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  trackById(_: number, p: Product): number { return p.id; }

  // FAQ
  openFaq: number | null = null;
  faqItems = computed(() => {
    if (this.collectionType() === 'engagement') {
      return [
        { q: 'What are the most popular engagement ring trends for 2026?', a: 'Non-traditional designs and coloured gemstones dominate 2026 trends. Vintage-inspired halo rings and oval cuts are especially sought after.' },
        { q: 'How do I pick an engagement ring style?', a: 'Consider your partner\'s personal taste and lifestyle. Solitaires are timeless, halos add sparkle, our Love Knot is perfect for a romantic modern twist.' },
        { q: 'What is the difference between a natural and lab-grown diamond?', a: 'Both are identical in physical, chemical, and optical properties. Lab-grown diamonds are created in controlled environments at a more accessible price point.' },
        { q: 'Do engagement rings have to be diamond?', a: 'Not at all — sapphires, emeralds, rubies, and morganite all make stunning engagement ring centre stones.' },
        { q: 'How do I buy an engagement ring?', a: 'Set a budget → choose a style → consider the 4Cs → select your stone shape → determine ring size → book a private consultation with our bridal experts.' },
      ];
    } else {
      return [
        { q: 'When should we buy our wedding bands?', a: 'We recommend ordering your wedding bands at least 2-3 months before your wedding date to allow time for crafting and resizing.' },
        { q: 'Should our wedding bands match?', a: 'There are no rules! Many couples choose matching bands, while others prefer styles that reflect their individual personalities.' },
        { q: 'Can we engrave our wedding bands?', a: 'Yes, we offer complimentary engraving on most of our wedding collection to add a personal touch to your rings.' },
        { q: 'What is a contour band?', a: 'A contour band is curved or shaped to fit snugly against a non-straight engagement ring, like a pear or oval cut.' },
      ];
    }
  });
  toggleFaq(i: number) { this.openFaq = this.openFaq === i ? null : i; }

  // Reviews
  reviews = [
    { author: 'Jonathan', date: 'February 2025', text: '"Mackenzie was helpful and attentive to my partner\'s preferences. We found the perfect ring. My partner was so excited to wear it after we got engaged."', featured: false },
    { author: 'Fady L.', date: 'December 2024', text: '"I got my wedding band here and my experience was great! The team was extremely helpful in guiding me through the process. The ring is absolutely perfect."', featured: true },
    { author: 'Daniel H.', date: 'February 2025', text: '"A fantastic experience from start to finish. The sales team was knowledgeable, attentive, and made the entire process completely stress-free."', featured: false },
  ];

  // Newsletter
  nlEmail = '';
  onNewsletterSubmit() {
    if (!this.nlEmail) return;
    this.showToast('Thank you for subscribing! ✦');
    this.nlEmail = '';
  }
}
