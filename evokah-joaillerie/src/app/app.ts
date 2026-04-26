import { Component, inject, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ThemeService } from './core/services/theme.service';
import { SmoothScrollService } from './core/services/smooth-scroll.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    <main>
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `,
  styles: [`main { min-height: 60vh; }`],
})
export class App implements OnInit {
  private router      = inject(Router);
  private themeSvc    = inject(ThemeService);
  private scrollSvc   = inject(SmoothScrollService);

  ngOnInit(): void {
    // ── 1. Start smooth scroller ──────────────────────────
    this.scrollSvc.init();

    // ── 2. Apply theme for initial load ───────────────────
    this.themeSvc.applyForRoute(this.router.url);

    // ── 3. On every navigation: swap theme + scroll to top ─
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        this.themeSvc.applyForRoute(e.urlAfterRedirects);
        // Instant jump to top between page transitions
        this.scrollSvc.scrollToTop(true);
      });
  }
}
