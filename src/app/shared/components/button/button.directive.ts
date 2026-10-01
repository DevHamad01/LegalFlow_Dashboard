import { Directive, computed, input } from '@angular/core';

export type ButtonVariant = 'outline' | 'soft' | 'brand' | 'ghost';

/**
 * Button styles from the design, applied to native <button>/<a> elements so semantics stay native.
 *  outline: white, 1.2px #ebebeb border, 6px × 8px padding, 8px radius ("View All", "Calendar", "Hide")
 *  soft:    #f7f7f7 icon button, 8px radius (topbar search / notifications)
 *  brand:   LegalFlow alpha-10 background, brown text ("Ai Assistant")
 *  ghost:   transparent icon button (sidebar toggle, user menu)
 */
@Directive({
  selector: '[lfButton]',
  standalone: true,
  host: { '[class]': 'classes()', '[attr.type]': 'type()' },
})
export class ButtonDirective {
  readonly lfButton = input<ButtonVariant | ''>('outline');
  readonly type = input<'button' | 'submit'>('button');

  private static readonly base =
    'inline-flex shrink-0 select-none items-center justify-center whitespace-nowrap font-medium transition-colors duration-150 ' +
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 disabled:pointer-events-none disabled:opacity-50';

  private static readonly variants: Record<ButtonVariant, string> = {
    outline:
      'gap-1 rounded-8 border-[1.2px] border-stroke-200 bg-surface-0 px-[6.8px] py-[4.8px] text-label-sm text-ink-950 hover:bg-surface-50 active:bg-surface-200',
    soft: 'rounded-8 bg-surface-50 text-ink-950 hover:bg-surface-200 active:bg-surface-300/60',
    brand: 'gap-1 rounded-8 bg-brand-a10 px-2.5 py-2 text-label-sm text-brand-700 hover:bg-brand-a16 active:bg-brand-a16',
    ghost: 'rounded-4 text-ink-600 hover:bg-surface-50 hover:text-ink-950 active:bg-surface-200',
  };

  protected readonly classes = computed(
    () => `${ButtonDirective.base} ${ButtonDirective.variants[this.lfButton() || 'outline']}`,
  );
}
