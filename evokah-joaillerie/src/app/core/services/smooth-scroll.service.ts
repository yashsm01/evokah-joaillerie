import { Injectable, OnDestroy, NgZone } from '@angular/core';

/**
 * Luxury smooth scroll service
 * Uses requestAnimationFrame + linear interpolation (lerp) to create
 * a buttery smooth scroll effect — no external dependencies.
 *
 * Lerp formula: current + (target - current) * ease
 * Lower ease = slower, silkier scroll (0.06–0.10 is ideal for luxury feel)
 */
@Injectable({ providedIn: 'root' })
export class SmoothScrollService implements OnDestroy {
  private rafId    = 0;
  private current  = 0;   // current rendered scroll position
  private target   = 0;   // actual scroll target
  private ease     = 0.08; // interpolation factor (lower = smoother)
  private running  = false;
  private scrollEl!: HTMLElement;

  constructor(private ngZone: NgZone) {}

  /** Call once from app.ts to start the smooth scroller */
  init(): void {
    if (typeof window === 'undefined') return;

    // ── 1. Skip on touch devices ─────────────────────────
    // Native touch scrolling is far superior to manual lerp.
    // Overriding it often causes "rubber-banding" issues or lag.
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      console.log('SmoothScroll: Touch detected. Skipping override.');
      return;
    }

    // Use document.body as the scroll container
    this.scrollEl = document.documentElement;
    this.current  = window.scrollY;
    this.target   = window.scrollY;

    // Listen to native scroll wheel / key to update target only
    window.addEventListener('wheel',       this.onWheel,  { passive: false });
    window.addEventListener('keydown',     this.onKey,    { passive: true  });

    // Start the animation loop outside Angular zone to avoid CD overhead
    this.ngZone.runOutsideAngular(() => this.tick());
    this.running = true;
  }

  /** Instantly jump to a position (e.g. on route change) */
  scrollTo(y: number, instant = false): void {
    this.target  = Math.max(0, y);
    if (instant) {
      this.current = this.target;
      window.scrollTo(0, this.target);
    }
  }

  /** Smooth scroll to top — used after route navigation */
  scrollToTop(instant = false): void {
    this.scrollTo(0, instant);
  }

  // ── Private ───────────────────────────────────────────────

  private onWheel = (e: WheelEvent) => {
    e.preventDefault();
    this.target += e.deltaY * 1.2;
    this.clampTarget();
  };

  private onKey = (e: KeyboardEvent) => {
    const amounts: Record<string, number> = {
      ArrowDown: 80, ArrowUp: -80,
      PageDown: window.innerHeight * .85, PageUp: -(window.innerHeight * .85),
      Home: -999999, End: 999999,
      ' ': e.shiftKey ? -(window.innerHeight * .85) : window.innerHeight * .85,
    };
    if (amounts[e.key] !== undefined && !(e.target instanceof HTMLInputElement)) {
      this.target += amounts[e.key];
      this.clampTarget();
    }
  };

  private clampTarget(): void {
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    this.target = Math.max(0, Math.min(this.target, maxScroll));
  }

  private tick = (): void => {
    // Lerp: exponential ease-out
    this.current += (this.target - this.current) * this.ease;

    // Stop jitter when very close
    if (Math.abs(this.target - this.current) < 0.5) {
      this.current = this.target;
    }

    // Apply to the page
    window.scrollTo(0, this.current);

    this.rafId = requestAnimationFrame(this.tick);
  };

  ngOnDestroy(): void {
    cancelAnimationFrame(this.rafId);
    window.removeEventListener('wheel',     this.onWheel);
    window.removeEventListener('keydown',   this.onKey);
    this.running = false;
  }
}
