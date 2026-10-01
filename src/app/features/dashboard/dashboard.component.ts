import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CURRENT_USER } from '../../core/mock-data/dashboard.mock';
import { AiSummaryComponent } from './ai-summary/ai-summary.component';
import { RecentActivityComponent } from './recent-activity/recent-activity.component';
import { RecentCasesComponent } from './recent-cases/recent-cases.component';
import { StatsRowComponent } from './stats-row/stats-row.component';
import { UpcomingEventsComponent } from './upcoming-events/upcoming-events.component';
import { UpcomingTasksComponent } from './upcoming-tasks/upcoming-tasks.component';

/**
 * Dashboard page layout.
 *
 * Desktop (≥1024): two equal columns, 16px gaps. Left = Activities (578px) + Recent Cases (fills);
 *   right = AI Summary + Events (371px) + Tasks (fills). Both columns stretch to the same row
 *   height, and the last card in each column grows, so their bottoms always line up — including
 *   when the AI summary is collapsed or text wraps differently.
 * Below 1024: the column wrappers become `display: contents` and the cards form a single
 *   column, re-ordered by what matters most on a small screen (summary → today → work → history).
 */
@Component({
  selector: 'lf-dashboard',
  standalone: true,
  imports: [
    StatsRowComponent,
    RecentActivityComponent,
    AiSummaryComponent,
    UpcomingEventsComponent,
    RecentCasesComponent,
    UpcomingTasksComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <div class="flex flex-col gap-4 px-4 pb-6 pt-4 md:px-6 lg:pb-4">
      <header class="flex flex-col gap-1">
        <h1 class="text-label-lg font-medium text-ink-950">Welcome Back! {{ user.firstName }}</h1>
        <p class="text-para-sm font-book text-ink-600">
          <time datetime="2026-09-01">{{ user.today }}</time>
        </p>
      </header>

      <lf-stats-row />

      <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div class="contents lg:flex lg:min-w-0 lg:flex-col lg:gap-4">
          <lf-recent-activity class="order-4 lg:order-none lg:h-[578px]" />
          <lf-recent-cases class="order-5 lg:order-none lg:min-h-[366px] lg:flex-1" />
        </div>
        <div class="contents lg:flex lg:min-w-0 lg:flex-col lg:gap-4">
          <lf-ai-summary class="order-1 lg:order-none" />
          <lf-upcoming-events class="order-2 lg:order-none lg:h-[371px]" />
          <lf-upcoming-tasks class="order-3 lg:order-none lg:min-h-[417px] lg:flex-1" />
        </div>
      </div>
    </div>
  `,
})
export class DashboardComponent {
  protected readonly user = CURRENT_USER;
}
