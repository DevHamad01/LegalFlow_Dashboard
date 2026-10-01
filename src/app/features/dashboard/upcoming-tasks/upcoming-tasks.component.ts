import { ChangeDetectionStrategy, Component, computed, signal, viewChild } from '@angular/core';
import { TASK_BREAKDOWN, TASKS_TOTAL, UPCOMING_TASKS } from '../../../core/mock-data/dashboard.mock';
import { TaskStatus } from '../../../core/models/dashboard.models';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';
import { ButtonDirective } from '../../../shared/components/button/button.directive';
import { CardShellComponent } from '../../../shared/components/card-shell/card-shell.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';
import { ScrollAreaComponent } from '../../../shared/components/scroll-area/scroll-area.component';

const STATUS_COLOR: Record<TaskStatus, string> = {
  urgent: '#fb3748',
  todo: '#a3a3a3',
  'in-progress': '#178c4e',
  'on-hold': '#f6b51e',
};

const STATUS_LABEL: Record<TaskStatus, string> = {
  urgent: 'Urgent',
  todo: 'To Do',
  'in-progress': 'In progress',
  'on-hold': 'On Hold',
};

/**
 * Tasks overview (legend + segmented bar) and the task list.
 * Legend items double as filters (toggle buttons) for the list below.
 */
@Component({
  selector: 'lf-upcoming-tasks',
  standalone: true,
  imports: [CardShellComponent, ButtonDirective, BadgeComponent, ScrollAreaComponent, EmptyStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex min-w-0 flex-col' },
  templateUrl: './upcoming-tasks.component.html',
  styleUrl: './upcoming-tasks.component.scss',
})
export class UpcomingTasksComponent {
  protected readonly breakdown = TASK_BREAKDOWN;
  protected readonly total = TASKS_TOTAL;
  protected readonly color = STATUS_COLOR;
  protected readonly statusLabel = STATUS_LABEL;

  protected readonly filter = signal<TaskStatus | null>(null);
  private readonly scroller = viewChild(ScrollAreaComponent);

  protected readonly tasks = computed(() => {
    const f = this.filter();
    return f ? UPCOMING_TASKS.filter(t => t.status === f) : UPCOMING_TASKS;
  });

  protected readonly barLabel = computed(
    () => 'Tasks by status: ' + this.breakdown.map(b => `${b.label} ${b.count}`).join(', '),
  );

  protected toggleFilter(status: TaskStatus): void {
    this.filter.update(f => (f === status ? null : status));
    this.scroller()?.scrollToTop();
  }
}
