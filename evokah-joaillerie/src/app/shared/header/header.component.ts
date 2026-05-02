import { Component, inject, HostListener, signal, computed } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ThemeService, ThemeName, VALID_THEMES } from '../../core/services/theme.service';
import { LangService } from '../../core/services/lang.service';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  cart     = inject(CartService);
  themeSvc = inject(ThemeService);
  langSvc  = inject(LangService);
  private prodSvc = inject(ProductService);
  private router = inject(Router);

  allProducts = signal<Product[]>([]);

  engagementBestSellers = computed(() =>
    this.allProducts()
      .filter(p => p.collection === 'engagement' && (p.tag === 'Bestseller' || p.tag === 'Popular'))
      .slice(0, 2)
  );

  weddingBestSellers = computed(() =>
    this.allProducts()
      .filter(p => p.collection === 'wedding' && (p.tag === 'Bestseller' || p.tag === 'Luxury'))
      .slice(0, 2)
  );

  constructor() {
    this.prodSvc.getProducts().subscribe(p => this.allProducts.set(p));
  }

  searchOpen    = false;
  scrolled      = false;
  themeMenuOpen = false;
  mobileNavOpen = false;   // hamburger menu

  readonly themes: { key: ThemeName; label: string; dot: string }[] = [
    { key: 'dark',   label: 'Ruby',   dot: '#C41230' },
    { key: 'light',  label: 'Pearl',  dot: '#B8922A' },
    { key: 'warm',   label: 'Linen',  dot: '#b8813a' },
    { key: 'ocean',  label: 'Ocean',  dot: '#1f7a8c' },
    { key: 'silver', label: 'Silver', dot: '#8898b0' },
    { key: 'ivory',  label: 'Ivory',  dot: '#daddd8' },
  ];

  @HostListener('window:scroll')
  onScroll() { this.scrolled = window.scrollY > 40; }

  /** Close dropdowns when clicking outside */
  @HostListener('document:click', ['$event'])
  onDocClick(e: MouseEvent) {
    const t = e.target as HTMLElement;
    if (!t.closest('.theme-switcher')) this.themeMenuOpen = false;
    if (!t.closest('.mobile-nav') && !t.closest('.hamburger-btn')) this.mobileNavOpen = false;
  }

  toggleSearch()    { this.searchOpen    = !this.searchOpen; }
  closeSearch()     { this.searchOpen    = false; }
  toggleThemeMenu() { this.themeMenuOpen = !this.themeMenuOpen; }
  toggleMobileNav() { this.mobileNavOpen = !this.mobileNavOpen; }
  closeMobileNav()  { this.mobileNavOpen = false; this.mobileSubMenuOpen = {}; }

  mobileSubMenuOpen: { [key: string]: boolean } = {};
  toggleMobileSub(menu: string) {
    this.mobileSubMenuOpen[menu] = !this.mobileSubMenuOpen[menu];
  }

  switchLang()      { this.langSvc.toggle(); }

  switchTheme(theme: ThemeName): void {
    this.themeMenuOpen = false;
    this.mobileNavOpen = false;
    this.themeSvc.apply(theme);

    const rawUrl  = this.router.url.split('?')[0];
    const path    = rawUrl.replace(/^\//, '');
    const parts   = path.split('/').filter(Boolean);
    const firstIsTheme = VALID_THEMES.has(parts[0] as ThemeName);
    const pageParts    = firstIsTheme ? parts.slice(1) : parts;
    const page         = pageParts.join('/');
    const newUrl       = page ? `/${theme}/${page}` : `/${theme}/home`;
    this.router.navigateByUrl(newUrl);
  }
}
