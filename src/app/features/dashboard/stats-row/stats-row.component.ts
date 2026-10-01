import { ChangeDetectionStrategy, Component } from '@angular/core';
import { STAT_CARDS } from '../../../core/mock-data/dashboard.mock';
import { StatCardComponent } from '../../../shared/components/stat-card/stat-card.component';

/**
 * The four KPI cards sit in one #f7f7f7 tray (16px radius, 6px padding, 8px gap).
 * Columns follow the tray's own width (container query): 4 → 2 → 1.
 */
@Component({
  selector: 'lf-stats-row',
  standalone: true,
  imports: [StatCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block [container-type:inline-size]' },
  styles: `
    .tray { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    @container (min-width: 720px) { .tray { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
    @container (max-width: 279px) { .tray { grid-template-columns: minmax(0, 1fr); } }
    /* Each card spans two subgrid rows so headers and values line up across a row */
    .card { grid-row: span 2; grid-template-rows: subgrid; row-gap: 0; }
  `,
  template: `
    <section aria-labelledby="kpi-heading">
      <h2 id="kpi-heading" class="sr-only">Key metrics</h2>
      <ul class="tray grid gap-2 rounded-16 bg-surface-50 p-1.5" role="list">
        @for (card of cards; track card.id) {
          <li class="contents" role="listitem"><lf-stat-card class="card" [card]="card" /></li>
        }
      </ul>
    </section>
  `,
})
export class StatsRowComponent {
  protected readonly cards = STAT_CARDS;
}
