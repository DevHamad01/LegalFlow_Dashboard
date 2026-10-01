import { DestroyRef, Injectable, computed, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export type Viewport = 'mobile' | 'tablet' | 'desktop';

/** Single source of truth for the app shell: viewport + sidebar state, all signals. */
@Injectable({ providedIn: 'root' })
export class LayoutService {
  private readonly win = inject(DOCUMENT).defaultView;

  readonly viewport = signal<Viewport>(this.readViewport());
  /** Desktop / tablet: collapsed (icons only) vs open. Tablet starts collapsed. */
  readonly collapsed = signal(this.viewport() === 'tablet');
  /** Mobile only: off-canvas drawer visibility. */
  readonly drawerOpen = signal(false);

  readonly isMobile = computed(() => this.viewport() === 'mobile');
  /** The drawer is always fully expanded, so labels show on mobile regardless of `collapsed`. */
  readonly showLabels = computed(() => this.isMobile() || !this.collapsed());

  constructor() {
    const win = this.win;
    if (!win) return;
    const queries = ['(min-width: 768px)', '(min-width: 1024px)'].map(q => win.matchMedia(q));
    const onChange = () => {
      const prev = this.viewport();
      const next = this.readViewport();
      if (prev === next) return;
      this.viewport.set(next);
      if (next !== 'mobile') this.drawerOpen.set(false);
      if (next === 'tablet') this.collapsed.set(true);
      if (next === 'desktop' && prev === 'tablet') this.collapsed.set(false);
    };
    queries.forEach(q => q.addEventListener('change', onChange));
    inject(DestroyRef).onDestroy(() => queries.forEach(q => q.removeEventListener('change', onChange)));
  }

  toggleCollapsed(): void {
    this.collapsed.update(v => !v);
  }
  openDrawer(): void {
    this.drawerOpen.set(true);
  }
  closeDrawer(): void {
    this.drawerOpen.set(false);
  }

  private readViewport(): Viewport {
    const w = this.win?.innerWidth ?? 1440;
    return w < 768 ? 'mobile' : w < 1024 ? 'tablet' : 'desktop';
  }
}
