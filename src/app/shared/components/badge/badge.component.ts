import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type BadgeVariant = 'draft' | 'active' | 'urgent' | 'on-hold' | 'in-progress' | 'todo';

/**
 * Status chip. Two sizes from the design:
 *  - sm (case list): 12/16 medium, 2px × 6px padding, 6px radius
 *  - md (task list): 14/20 medium, 4px × 8px padding, 6px radius
 */
@Component({
  selector: 'lf-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'inline-flex shrink-0' },
  template: `<span [class]="classes()"><ng-content /></span>`,
})
export class BadgeComponent {
  readonly variant = input.required<BadgeVariant>();
  readonly size = input<'sm' | 'md'>('md');

  private static readonly tones: Record<BadgeVariant, string> = {
    draft: 'bg-muted-a16 text-ink-950',
    active: 'bg-success-a16 text-success-700',
    urgent: 'bg-danger-a10 text-danger-700',
    'on-hold': 'bg-warning-a10 text-warning-700',
    'in-progress': 'bg-success-a10 text-success-800',
    todo: 'bg-surface-50 text-ink-600',
  };

  protected readonly classes = computed(() => {
    const size = this.size() === 'sm' ? 'px-1.5 py-0.5 text-label-xs' : 'px-2 py-1 text-label-sm';
    return `inline-flex items-center justify-center whitespace-nowrap rounded-6 font-medium ${size} ${BadgeComponent.tones[this.variant()]}`;
  });
}
