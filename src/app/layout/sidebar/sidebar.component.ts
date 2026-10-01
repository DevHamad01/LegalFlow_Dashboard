import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Injector,
  afterNextRender,
  effect,
  inject,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {
  CURRENT_USER,
  DEFAULT_EXPANDED_GROUPS,
  FOOTER_NAV,
  NAV_ITEMS,
} from '../../core/mock-data/dashboard.mock';
import { NavItem } from '../../core/models/dashboard.models';
import { LayoutService } from '../../core/services/layout.service';
import { AvatarComponent } from '../../shared/components/avatar/avatar.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { TooltipDirective } from '../../shared/components/tooltip/tooltip.directive';

@Component({
  selector: 'lf-sidebar',
  standalone: true,
  imports: [IconComponent, LogoComponent, AvatarComponent, TooltipDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  host: {
    '(document:keydown.escape)': 'onEscape()',
  },
})
export class SidebarComponent {
  protected readonly layout = inject(LayoutService);
  private readonly doc = inject(DOCUMENT);
  private readonly injector = inject(Injector);

  protected readonly items = NAV_ITEMS;
  protected readonly footerItems = FOOTER_NAV;
  protected readonly user = CURRENT_USER;

  protected readonly activeId = signal('dashboard');
  protected readonly expanded = signal<ReadonlySet<string>>(new Set(DEFAULT_EXPANDED_GROUPS));

  private readonly panel = viewChild.required<ElementRef<HTMLElement>>('panel');
  private readonly closeBtn = viewChild<ElementRef<HTMLButtonElement>>('closeBtn');

  constructor() {
    // Mobile drawer: move focus in on open, lock body scroll while open.
    effect(() => {
      const open = this.layout.drawerOpen();
      untracked(() => {
        this.doc.body.style.overflow = open ? 'hidden' : '';
        // Focus after the DOM update so `inert` is already removed from the panel.
        if (open) afterNextRender(() => this.closeBtn()?.nativeElement.focus(), { injector: this.injector });
      });
    });
    afterNextRender(() => this.panel().nativeElement.classList.add('is-ready'));
  }

  protected isExpanded(id: string): boolean {
    return this.expanded().has(id);
  }

  /** True when any child of the group is the active page (keeps the parent highlighted). */
  protected groupHasActive(item: NavItem): boolean {
    return !!item.children?.some(c => c.id === this.activeId());
  }

  protected toggleGroup(item: NavItem): void {
    // In the icon-only state a group can't show children, so open the sidebar first.
    if (!this.layout.showLabels()) {
      this.layout.collapsed.set(false);
      this.expanded.update(s => new Set(s).add(item.id));
      return;
    }
    this.expanded.update(s => {
      const next = new Set(s);
      next.has(item.id) ? next.delete(item.id) : next.add(item.id);
      return next;
    });
  }

  protected select(id: string, event: Event): void {
    event.preventDefault(); // static demo — no routing
    this.activeId.set(id);
    if (this.layout.isMobile()) this.layout.closeDrawer();
  }

  protected onEscape(): void {
    if (this.layout.isMobile() && this.layout.drawerOpen()) this.layout.closeDrawer();
  }

  /** Simple focus trap for the modal drawer. */
  protected trapFocus(event: KeyboardEvent): void {
    if (!this.layout.isMobile() || !this.layout.drawerOpen() || event.key !== 'Tab') return;
    const focusables = Array.from(
      this.panel().nativeElement.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
    ).filter(el => el.offsetParent !== null);
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && this.doc.activeElement === first) {
      last.focus();
      event.preventDefault();
    } else if (!event.shiftKey && this.doc.activeElement === last) {
      first.focus();
      event.preventDefault();
    }
  }
}
