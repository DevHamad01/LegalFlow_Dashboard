import { ChangeDetectionStrategy, Component, computed, input, signal, afterNextRender } from '@angular/core';
import { CasesOverview } from '../../../core/models/dashboard.models';

/**
 * Donut from "Cases chart": 185 × 184 ring, active (#178c4e, round caps) over draft (#d1d1d1),
 * centre label Urbanist 32/40 + "Cases". The active arc draws in once on load.
 */
@Component({
  selector: 'lf-cases-donut',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'relative inline-flex shrink-0 items-center justify-center' },
  styles: `
    .arc { transition: stroke-dashoffset 900ms cubic-bezier(0.2, 0, 0, 1); }
  `,
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      viewBox="0 0 184 184"
      role="img"
      [attr.aria-label]="ariaLabel()"
    >
      <circle cx="92" cy="92" [attr.r]="r" fill="none" stroke="#d1d1d1" [attr.stroke-width]="stroke" />
      <circle
        class="arc"
        cx="92"
        cy="92"
        [attr.r]="r"
        fill="none"
        stroke="#178c4e"
        [attr.stroke-width]="stroke"
        stroke-linecap="round"
        [attr.stroke-dasharray]="circumference"
        [attr.stroke-dashoffset]="drawn() ? offset() : circumference"
        transform="rotate(-90 92 92)"
      />
    </svg>
    <div class="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-0.5" aria-hidden="true">
      <span class="font-title text-title-h4 font-medium text-ink-950">{{ data().total }}</span>
      <span class="text-label-sm font-medium text-ink-600">Cases</span>
    </div>
  `,
})
export class CasesDonutComponent {
  readonly data = input.required<CasesOverview>();
  readonly size = input<number>(184);

  protected readonly stroke = 22;
  protected readonly r = (184 - this.stroke) / 2;
  protected readonly circumference = 2 * Math.PI * this.r;
  protected readonly drawn = signal(false);

  protected readonly offset = computed(() => {
    const { active, draft } = this.data();
    const share = active + draft ? active / (active + draft) : 0;
    return this.circumference * (1 - share);
  });

  protected readonly ariaLabel = computed(() => {
    const d = this.data();
    return `${d.total} cases. ${d.active} active, ${d.draft} draft.`;
  });

  constructor() {
    afterNextRender(() => requestAnimationFrame(() => this.drawn.set(true)));
  }
}
