import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AI_SUMMARY } from '../../../core/mock-data/dashboard.mock';
import { ButtonDirective } from '../../../shared/components/button/button.directive';
import { IconComponent } from '../../../shared/components/icon/icon.component';

/**
 * AI summary card — 12px radius, rgba(20,20,20,.08) border, peach→pink gradient,
 * brown (#784031) Urbanist title and copy. "Hide" collapses the body (animated),
 * the header stays so it can be shown again.
 */
@Component({
  selector: 'lf-ai-summary',
  standalone: true,
  imports: [ButtonDirective, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block min-w-0' },
  styles: `
    .card {
      background: linear-gradient(88.98deg, rgba(250, 226, 189, 0.1) 0.21%, #fde9fe 45.55%, #fef2fe 98.86%);
    }
    .body { display: grid; grid-template-rows: 1fr; transition: grid-template-rows 240ms cubic-bezier(0.2, 0, 0, 1); }
    .body.is-hidden { grid-template-rows: 0fr; }
    .chev { transition: transform 240ms cubic-bezier(0.2, 0, 0, 1); }
  `,
  template: `
    <section class="card overflow-hidden rounded-12 [outline:1px_solid_rgba(20,20,20,0.08)] [outline-offset:-1px]" aria-labelledby="ai-summary-title">
      <header
        class="flex items-center justify-between gap-2 p-3"
        [class.shadow-[inset_0_-1px_0_rgba(20,20,20,0.08)]]="open()"
      >
        <div class="flex min-w-0 items-center gap-2">
          <lf-icon name="sparkles" [size]="20" class="text-brand-800" />
          <h2 id="ai-summary-title" class="truncate font-title text-title-h6 font-medium-2 text-brand-800">Ai Summary</h2>
        </div>
        <button
          lfButton="outline"
          aria-controls="ai-summary-body"
          [attr.aria-expanded]="open()"
          (click)="open.set(!open())"
        >
          {{ open() ? 'Hide' : 'Show' }}
          <lf-icon name="chevron-down" [size]="14" class="chev" [class.rotate-180]="open()" />
        </button>
      </header>

      <div id="ai-summary-body" class="body" [class.is-hidden]="!open()" [attr.inert]="open() ? null : ''">
        <div class="min-h-0 overflow-hidden">
          <p class="p-3 text-para-sm font-book text-brand-800">{{ summary }}</p>
        </div>
      </div>
    </section>
  `,
})
export class AiSummaryComponent {
  protected readonly summary = AI_SUMMARY;
  protected readonly open = signal(true);
}
