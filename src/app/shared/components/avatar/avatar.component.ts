import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/** 24×24, 6px radius avatar. Uses an image when provided, otherwise the user's initial. */
@Component({
  selector: 'lf-avatar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'inline-flex shrink-0' },
  template: `
    @if (src()) {
      <img [src]="src()" [alt]="name()" class="size-6 rounded-6 object-cover" width="24" height="24" />
    } @else {
      <span
        class="inline-flex size-6 items-center justify-center rounded-6 bg-brand-a16 text-label-xs font-semibold text-brand-800"
        aria-hidden="true"
        >{{ initial() }}</span
      >
    }
  `,
})
export class AvatarComponent {
  readonly name = input.required<string>();
  readonly src = input<string | null>(null);
  protected readonly initial = computed(() => this.name().trim().charAt(0).toUpperCase());
}
