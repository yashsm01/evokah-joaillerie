import { Component, inject, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ThemeService } from './core/services/theme.service';

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
  private router  = inject(Router);
  private themeSvc = inject(ThemeService);

  ngOnInit(): void {
    // Apply theme for the initial load (no NavigationEnd fires on first paint)
    this.themeSvc.applyForRoute(this.router.url);

    // Re-apply theme on every subsequent navigation
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        this.themeSvc.applyForRoute(e.urlAfterRedirects);
      });
  }
}
