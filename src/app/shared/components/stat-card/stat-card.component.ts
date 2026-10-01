import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { StatCard } from '../../../core/models/dashboard.models';
import { IconComponent } from '../icon/icon.component';

/**
 * KPI card. Design: white, 12px radius; header row 8×12 padding with bottom border,
 * tinted 6px-radius icon box (alpha-10 fill, alpha-16 border, 6px padding);
 * value row 8px padding with Urbanist 24/26 value and a 12px trend icon + 14px % label.
 */
@Component({
  selector: 'lf-stat-card',
  standalone: true,
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'grid min-w-0 grid-rows-[auto_1fr] overflow-hidden rounded-12 bg-surface-0' },
  styles: `
    /* Queries the stats tray container (a container on the card itself would disable subgrid).
       Narrow tray = 2-up cards on phones: wrap the label instead of cutting it, stack value + change. */
    @container (max-width: 440px) {
      .label { white-space: normal; overflow: visible; }
      .value-row { flex-direction: column; align-items: flex-start; justify-content: flex-start; }
      .change { margin-left: -4px; }
    }
  `,
  template: `
    <div class="flex min-w-0 items-center gap-2 px-3 py-2 shadow-[inset_0_-1px_0_#ebebeb]">
      <span [class]="iconBox()" aria-hidden="true">
        <lf-icon [name]="card().icon" [size]="card().iconSize" />
      </span>
      <h3 class="label truncate text-label-sm font-medium text-ink-600">{{ card().label }}</h3>
    </div>
    <div class="value-row flex items-center justify-between gap-x-2 gap-y-1 p-2">
      <p class="whitespace-nowrap font-title text-[20px] font-medium leading-[26px] text-ink-950 sm:text-title-h5">
        {{ card().value }}
      </p>
      <p
        class="change inline-flex items-center gap-1 rounded-6 px-1 py-0.5 text-label-sm font-medium"
        [class.text-success-500]="card().sentiment === 'positive'"
        [class.text-danger-500]="card().sentiment === 'negative'"
      >
        <lf-icon [name]="card().direction === 'up' ? 'trend-up' : 'trend-down'" [size]="12" [strokeWidth]="2" />
        <span>{{ card().change }}%</span>
        <span class="sr-only">{{ srChange() }}</span>
      </p>
    </div>
  `,
})
export class StatCardComponent {
  readonly card = input.required<StatCard>();

  private static readonly tones: Record<StatCard['tone'], string> = {
    brand: 'bg-brand-a10 border-brand-a16 text-brand-500',
    success: 'bg-success-a10 border-success-a16 text-success-700',
    violet: 'bg-violet-a10 border-violet-a16 text-[#784def]',
    warning: 'bg-warning-a10 border-warning-a16 text-warning-700',
  };

  protected readonly iconBox = computed(
    () => `inline-flex shrink-0 rounded-6 border p-[5px] ${StatCardComponent.tones[this.card().tone]}`,
  );

  protected readonly srChange = computed(
    () => `${this.card().direction === 'up' ? 'increased' : 'decreased'} compared with last period`,
  );
}
