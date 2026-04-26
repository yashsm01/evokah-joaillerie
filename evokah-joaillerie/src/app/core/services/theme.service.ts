import { Injectable, signal } from '@angular/core';

export type ThemeName = 'dark' | 'light' | 'warm' | 'ocean' | 'silver';

export const VALID_THEMES = new Set<ThemeName>(['dark', 'light', 'warm', 'ocean', 'silver']);

/** Fallback theme when no theme prefix is in the URL */
export const DEFAULT_THEME: ThemeName = 'ocean';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private _current = signal<ThemeName>(DEFAULT_THEME);
  readonly current = this._current.asReadonly();

  /**
   * Parses the URL and applies a theme.
   *
   * Supported URL formats:
   *   /warm/cart        → theme = 'warm'
   *   /dark/engagement  → theme = 'dark'
   *   /ocean/home       → theme = 'ocean'
   *   /cart             → theme = DEFAULT_THEME
   *   /                 → theme = DEFAULT_THEME
   */
  applyForRoute(url: string): void {
    const path    = url.split('?')[0].replace(/^\//, '');
    const parts   = path.split('/').filter(Boolean);
    const first   = parts[0] as ThemeName;

    const theme: ThemeName = VALID_THEMES.has(first) ? first : DEFAULT_THEME;
    this.apply(theme);
  }

  /** Directly apply a theme (used by the header switcher for instant response) */
  apply(theme: ThemeName): void {
    this._current.set(theme);
    document.body.setAttribute('data-theme', theme);
  }
}
