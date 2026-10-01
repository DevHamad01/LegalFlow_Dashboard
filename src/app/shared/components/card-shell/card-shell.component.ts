import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { IconName } from '../icon/icon.types';

let nextId = 0;

/**
 * Reusable dashboard card: white surface, 1px #ebebeb border, 16px radius,
 * grey (#f7f7f7) header with icon + Urbanist title + optional actions slot.
 * Body has the design's 12px padding and 12px vertical gap.
 */
@Component({
  selector: 'lf-card-shell',
  standalone: true,
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex min-w-0 flex-col' },
  template: `
    <section
      class="lf-inside-stroke flex min-h-0 flex-1 flex-col overflow-hidden rounded-16 bg-surface-0"
      [attr.aria-labelledby]="titleId"
    >
      <header class="flex shrink-0 items-center gap-2 bg-surface-50 p-3 shadow-[inset_0_-1px_0_#ebebeb]">
        <lf-icon [name]="icon()" [size]="20" class="text-ink-950" />
        <h2 [id]="titleId" class="lf-card-title min-w-0 flex-1 truncate">{{ title() }}</h2>
        <ng-content select="[cardActions]" />
      </header>
      <div class="flex min-h-0 flex-1 flex-col gap-3 p-3">
        <ng-content />
      </div>
    </section>
  `,
})
export class CardShellComponent {
  readonly title = input.required<string>();
  readonly icon = input.required<IconName>();
  readonly titleId = `lf-card-title-${nextId++}`;
}
