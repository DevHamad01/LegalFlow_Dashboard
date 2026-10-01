import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { IconName } from '../icon/icon.types';

@Component({
  selector: 'lf-empty-state',
  standalone: true,
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col items-center justify-center gap-2 rounded-8 bg-surface-0 px-4 py-8 text-center' },
  template: `
    <span class="inline-flex rounded-8 bg-brand-a10 p-2 text-brand-500" aria-hidden="true">
      <lf-icon [name]="icon()" [size]="20" />
    </span>
    <p class="text-label-sm font-medium text-ink-950">{{ title() }}</p>
    @if (hint()) {
      <p class="max-w-[260px] text-para-sm font-book text-ink-600">{{ hint() }}</p>
    }
    <ng-content />
  `,
})
export class EmptyStateComponent {
  readonly icon = input<IconName>('calendar-empty');
  readonly title = input.required<string>();
  readonly hint = input<string>('');
}
