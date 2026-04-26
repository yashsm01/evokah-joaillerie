import { Component, inject, HostListener } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ThemeService, ThemeName, VALID_THEMES } from '../../core/services/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  cart      = inject(CartService);
  themeSvc  = inject(ThemeService);
  private router = inject(Router);

  searchOpen    = false;
  scrolled      = false;
  themeMenuOpen = false;

  readonly themes: { key: ThemeName; label: string; dot: string }[] = [
    { key: 'dark',   label: 'Ruby',   dot: '#C41230' },
    { key: 'light',  label: 'Pearl',  dot: '#B8922A' },
    { key: 'warm',   label: 'Linen',  dot: '#b8813a' },
    { key: 'ocean',  label: 'Ocean',  dot: '#1f7a8c' },
    { key: 'silver', label: 'Silver', dot: '#8898b0' },
    { key: 'ivory',  label: 'Ivory',  dot: '#daddd8' },
  ];

  toggleSearch()    { this.searchOpen    = !this.searchOpen; }
  closeSearch()     { this.searchOpen    = false; }
  toggleThemeMenu() { this.themeMenuOpen = !this.themeMenuOpen; }

  /** Close theme menu when clicking anywhere outside the switcher */
  @HostListener('document:click', ['$event'])
  onDocClick(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (!target.closest('.theme-switcher')) {
      this.themeMenuOpen = false;
    }
  }

  /**
   * 1. Apply theme immediately (instant CSS swap via data-theme)
   * 2. Update URL to /:theme/:page so the link is shareable
   */
  switchTheme(theme: ThemeName): void {
    this.themeMenuOpen = false;

    // ── Step 1: apply CSS immediately ──────────────────
    this.themeSvc.apply(theme);

    // ── Step 2: rebuild URL with new theme prefix ───────
    const rawUrl  = this.router.url.split('?')[0];       // drop query string
    const path    = rawUrl.replace(/^\//, '');            // strip leading /
    const parts   = path.split('/').filter(Boolean);

    // If first segment is a known theme, remove it to get the page part
    const firstIsTheme = VALID_THEMES.has(parts[0] as ThemeName);
    const pageParts    = firstIsTheme ? parts.slice(1) : parts;
    const page         = pageParts.join('/');

    // Build the new URL
    const newUrl = page ? `/${theme}/${page}` : `/${theme}/home`;

    this.router.navigateByUrl(newUrl);
  }
}
