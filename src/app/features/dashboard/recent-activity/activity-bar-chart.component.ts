import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { ActivityDay, ActivitySummary } from '../../../core/models/dashboard.models';

type SeriesKey = 'task' | 'matter' | 'document';

/**
 * Grouped bar chart from the "grouped-bar-chart" frame.
 * Plot area 130px, 4 gridlines, 22px bars with 8px radius and 3px gaps, 16px track inset.
 * In the design every unit is exactly 8px, so heights are value × 8px (max 15 → 120px).
 * Bars flex down on narrow cards; tooltips appear on hover and keyboard focus.
 */
@Component({
  selector: 'lf-activity-bar-chart',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block [container-type:inline-size]' },
  styleUrl: './activity-bar-chart.component.scss',
  templateUrl: './activity-bar-chart.component.html',
})
export class ActivityBarChartComponent {
  readonly data = input.required<ActivitySummary>();

  protected readonly series: { key: SeriesKey; label: string; color: string }[] = [
    { key: 'task', label: 'Task', color: '#fa7319' },
    { key: 'matter', label: 'Matter', color: '#178c4e' },
    { key: 'document', label: 'Document', color: '#f6b51e' },
  ];
  protected readonly yTicks = [15, 10, 5, 0];
  protected readonly unitPx = 8;

  protected readonly active = signal<string | null>(null);

  protected readonly summaryLabel = computed(() => {
    const d = this.data();
    return `${d.total} activities, ${d.period}. ` + d.days.map(day => this.dayLabel(day)).join('. ');
  });

  protected dayLabel(day: ActivityDay): string {
    return `${day.day}: ${day.task} tasks, ${day.matter} matters, ${day.document} documents`;
  }

  protected total(day: ActivityDay): number {
    return day.task + day.matter + day.document;
  }
}
