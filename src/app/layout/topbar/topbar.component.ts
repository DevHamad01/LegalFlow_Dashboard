import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  effect,
  inject,
  untracked,
  viewChild,
} from '@angular/core';
import { LayoutService } from '../../core/services/layout.service';
import { ButtonDirective } from '../../shared/components/button/button.directive';
import { IconComponent } from '../../shared/components/icon/icon.component';

/**
 * 52px top bar: breadcrumb on the left, AI Assistant / search / notifications on the right.
 * Design: 8px × 32px padding, 8px gap between actions. Mobile adds the drawer hamburger.
 */
@Component({
  selector: 'lf-topbar',
  standalone: true,
  imports: [IconComponent, ButtonDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'sticky top-0 z-30 flex h-topbar shrink-0 items-center justify-between gap-3 border-b border-stroke-200 bg-surface-0 px-4 py-2 md:px-8',
    role: 'banner',
  },
  template: `
    <div class="flex min-w-0 items-center gap-2">
      @if (layout.isMobile()) {
        <button
          #menuBtn
          lfButton="ghost"
          class="-ml-2 size-10"
          aria-label="Open menu"
          aria-controls="app-sidebar"
          [attr.aria-expanded]="layout.drawerOpen()"
          (click)="layout.openDrawer()"
        >
          <lf-icon name="menu" [size]="20" />
        </button>
      }
      <nav aria-label="Breadcrumb" class="min-w-0">
        <ol class="flex items-center gap-2" role="list">
          <li>
            <span class="text-label-sm font-medium text-ink-950" aria-current="page">Home</span>
          </li>
        </ol>
      </nav>
    </div>

    <div class="flex items-center gap-2">
      <button lfButton="brand" class="max-sm:size-10 max-sm:px-0" aria-label="Open AI Assistant">
        <lf-icon name="sparkles" [size]="16" class="text-brand-700" />
        <span class="max-sm:sr-only">Ai Assistant</span>
      </button>
      <button lfButton="soft" class="size-9 max-sm:size-10" aria-label="Search">
        <lf-icon name="search" [size]="16" />
      </button>
      <button lfButton="soft" class="size-9 max-sm:size-10" aria-label="Notifications, 1 unread">
        <lf-icon name="bell" [size]="18" />
      </button>
    </div>
  `,
})
export class TopbarComponent {
  protected readonly layout = inject(LayoutService);
  private readonly menuBtn = viewChild<ElementRef<HTMLButtonElement>>('menuBtn');
  private wasOpen = false;

  constructor() {
    // Return focus to the hamburger when the drawer closes.
    effect(() => {
      const open = this.layout.drawerOpen();
      untracked(() => {
        if (this.wasOpen && !open) this.menuBtn()?.nativeElement.focus();
        this.wasOpen = open;
      });
    });
  }
}
