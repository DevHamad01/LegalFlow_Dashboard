import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CASES_OVERVIEW, RECENT_CASES } from '../../../core/mock-data/dashboard.mock';
import { ButtonDirective } from '../../../shared/components/button/button.directive';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';
import { CardShellComponent } from '../../../shared/components/card-shell/card-shell.component';
import { ScrollAreaComponent } from '../../../shared/components/scroll-area/scroll-area.component';
import { CasesDonutComponent } from './cases-donut.component';

@Component({
  selector: 'lf-recent-cases',
  standalone: true,
  imports: [CardShellComponent, ButtonDirective, BadgeComponent, ScrollAreaComponent, CasesDonutComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex min-w-0 flex-col' },
  styleUrl: './recent-cases.component.scss',
  template: `
    <lf-card-shell class="min-h-0 flex-1" title="Recent Cases" icon="briefcase">
      <button cardActions lfButton="outline">View All</button>

      <div class="body">
        <!-- Cases overview chart -->
        <div class="overview">
          <div class="overview-text">
            <h3 class="text-label-md font-medium text-ink-950">Cases Overview</h3>
            <ul class="flex items-start gap-3" role="list">
              <li class="flex items-center gap-1.5">
                <span class="size-2 rounded-full bg-success-700" aria-hidden="true"></span>
                <span class="text-para-sm font-book text-ink-600">Active</span>
                <span class="text-label-sm font-medium text-ink-950">{{ overview.active }}</span>
              </li>
              <li class="flex items-center gap-1.5">
                <span class="size-2 rounded-full bg-surface-300" aria-hidden="true"></span>
                <span class="text-para-sm font-book text-ink-600">Draft</span>
                <span class="text-label-sm font-medium text-ink-950">{{ overview.draft }}</span>
              </li>
            </ul>
          </div>
          <lf-cases-donut class="donut" [data]="overview" />
        </div>

        <!-- Case list -->
        <lf-scroll-area class="list-area lf-fill" label="Recent cases" [gap]="8">
          <ul class="flex flex-col gap-1" role="list">
            @for (c of cases; track c.id) {
              <li class="row">
                <div class="flex min-w-0 flex-1 flex-col gap-1">
                  <div class="flex min-w-0 items-center gap-1.5">
                    <a href="#" class="case-no" (click)="$event.preventDefault()" [attr.aria-label]="'Case ' + c.number">{{
                      c.number
                    }}</a>
                    <span class="size-[3px] shrink-0 rounded-full bg-ink-400" aria-hidden="true"></span>
                    <p class="min-w-0 flex-1 truncate text-label-sm font-medium text-ink-950">{{ c.client }}</p>
                  </div>
                  <p class="truncate text-para-xs font-book text-ink-600">{{ c.type }}</p>
                </div>
                <lf-badge size="sm" [variant]="c.status">{{ c.status === 'active' ? 'Active' : 'Draft' }}</lf-badge>
              </li>
            }
          </ul>
        </lf-scroll-area>
      </div>
    </lf-card-shell>
  `,
})
export class RecentCasesComponent {
  protected readonly overview = CASES_OVERVIEW;
  protected readonly cases = RECENT_CASES;
}
