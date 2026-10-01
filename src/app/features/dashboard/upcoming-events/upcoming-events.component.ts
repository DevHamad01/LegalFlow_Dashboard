import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';
import { DEFAULT_SELECTED_DAY, EVENTS, WEEK_DAYS } from '../../../core/mock-data/dashboard.mock';
import { CalendarDay } from '../../../core/models/dashboard.models';
import { ButtonDirective } from '../../../shared/components/button/button.directive';
import { CardShellComponent } from '../../../shared/components/card-shell/card-shell.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { ScrollAreaComponent } from '../../../shared/components/scroll-area/scroll-area.component';

/**
 * Week strip (WAI-ARIA tabs pattern: arrow keys / Home / End) that filters the event list.
 * Dots under each date show the number of events that day (max 4, as in the design).
 */
@Component({
  selector: 'lf-upcoming-events',
  standalone: true,
  imports: [CardShellComponent, ButtonDirective, IconComponent, ScrollAreaComponent, EmptyStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex min-w-0 flex-col' },
  templateUrl: './upcoming-events.component.html',
  styleUrl: './upcoming-events.component.scss',
})
export class UpcomingEventsComponent {
  protected readonly days = WEEK_DAYS;
  protected readonly selected = signal(DEFAULT_SELECTED_DAY);

  private readonly tabs = viewChildren<ElementRef<HTMLButtonElement>>('tab');
  private readonly scroller = viewChild(ScrollAreaComponent);

  private readonly countByDay = computed(() => {
    const map = new Map<string, number>();
    for (const e of EVENTS) map.set(e.date, (map.get(e.date) ?? 0) + 1);
    return map;
  });

  protected readonly selectedDay = computed(() => this.days.find(d => d.iso === this.selected())!);
  protected readonly events = computed(() => EVENTS.filter(e => e.date === this.selected()));

  protected readonly selectedLabel = computed(() => {
    const d = this.selectedDay();
    return `${this.longWeekday(d)}, ${d.date} September`;
  });

  protected dots(day: CalendarDay): number[] {
    return Array.from({ length: Math.min(this.countByDay().get(day.iso) ?? 0, 4) }, (_, i) => i);
  }

  protected eventCount(day: CalendarDay): number {
    return this.countByDay().get(day.iso) ?? 0;
  }

  protected select(iso: string): void {
    if (iso === this.selected()) return;
    this.selected.set(iso);
    this.scroller()?.scrollToTop();
  }

  protected onKeydown(event: KeyboardEvent, index: number): void {
    const last = this.days.length - 1;
    const next =
      event.key === 'ArrowRight' ? (index === last ? 0 : index + 1)
      : event.key === 'ArrowLeft' ? (index === 0 ? last : index - 1)
      : event.key === 'Home' ? 0
      : event.key === 'End' ? last
      : -1;
    if (next < 0) return;
    event.preventDefault();
    this.select(this.days[next].iso);
    this.tabs()[next]?.nativeElement.focus();
  }

  protected longWeekday(d: CalendarDay): string {
    const names: Record<string, string> = {
      MON: 'Monday', TUE: 'Tuesday', WED: 'Wednesday', THU: 'Thursday', FRI: 'Friday', SAT: 'Saturday', SUN: 'Sunday',
    };
    return names[d.weekday] ?? d.weekday;
  }
}
