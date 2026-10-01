import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ACTIVITIES, ACTIVITY_SUMMARY } from '../../../core/mock-data/dashboard.mock';
import { CardShellComponent } from '../../../shared/components/card-shell/card-shell.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { ScrollAreaComponent } from '../../../shared/components/scroll-area/scroll-area.component';
import { ActivityBarChartComponent } from './activity-bar-chart.component';

@Component({
  selector: 'lf-recent-activity',
  standalone: true,
  imports: [CardShellComponent, IconComponent, ScrollAreaComponent, ActivityBarChartComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex min-w-0 flex-col' },
  styleUrl: './recent-activity.component.scss',
  template: `
    <lf-card-shell class="min-h-0 flex-1" title="Your Recent Activities" icon="clock">
      <lf-activity-bar-chart class="shrink-0" [data]="summary" />

      <lf-scroll-area class="list-area lf-fill" label="Recent activity feed" [gap]="8">
        <ul class="flex flex-col gap-1 [container-type:inline-size]" role="list">
          @for (a of activities; track a.id) {
            <li class="row">
              <div class="flex min-w-0 flex-col gap-1">
                <p class="truncate text-para-md font-book-md text-ink-950">{{ a.title }}</p>
                <p class="text-para-sm font-book text-ink-600">
                  <time>{{ a.time }}</time>
                </p>
              </div>

              @switch (a.attachment.kind) {
                @case ('link') {
                  <a href="#" class="chip chip--link" (click)="$event.preventDefault()">
                    <span class="truncate">{{ a.attachment.label }}</span>
                    <lf-icon name="arrow-up-right" [size]="16" />
                  </a>
                }
                @case ('file') {
                  <a
                    href="#"
                    class="chip chip--file"
                    [attr.aria-label]="'Download ' + a.attachment.label"
                    (click)="$event.preventDefault()"
                  >
                    <lf-icon name="file-pdf" [size]="20" [strokeWidth]="1.25" />
                    <span class="truncate text-ink-950">{{ a.attachment.label }}</span>
                    <lf-icon name="download" [size]="14" class="text-ink-600" />
                  </a>
                }
              }
            </li>
          }
        </ul>
      </lf-scroll-area>
    </lf-card-shell>
  `,
})
export class RecentActivityComponent {
  protected readonly summary = ACTIVITY_SUMMARY;
  protected readonly activities = ACTIVITIES;
}
