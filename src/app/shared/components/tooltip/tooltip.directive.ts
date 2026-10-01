import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, OnDestroy, Renderer2, inject, input } from '@angular/core';

let nextId = 0;

/**
 * Lightweight tooltip for icon-only controls (collapsed sidebar).
 * Shows on hover and keyboard focus, hides on blur / mouseleave / Escape.
 * Rendered in <body> with position:fixed so it never gets clipped by the sidebar's overflow.
 */
@Directive({
  selector: '[lfTooltip]',
  standalone: true,
  host: {
    '(mouseenter)': 'show()',
    '(focusin)': 'show()',
    '(mouseleave)': 'hide()',
    '(focusout)': 'hide()',
    '(keydown.escape)': 'hide()',
    '(click)': 'hide()',
  },
})
export class TooltipDirective implements OnDestroy {
  readonly lfTooltip = input<string>('');
  readonly lfTooltipDisabled = input<boolean>(false);

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly doc = inject(DOCUMENT);
  private readonly id = `lf-tooltip-${nextId++}`;
  private el: HTMLElement | null = null;

  show(): void {
    if (this.lfTooltipDisabled() || !this.lfTooltip()) return;
    if (!this.el) {
      this.el = this.renderer.createElement('div');
      this.renderer.setAttribute(this.el, 'role', 'tooltip');
      this.renderer.setAttribute(this.el, 'id', this.id);
      this.renderer.setAttribute(
        this.el,
        'class',
        'pointer-events-none fixed z-[60] whitespace-nowrap rounded-6 bg-ink-950 px-2 py-1 text-label-xs font-medium text-surface-0 shadow-tooltip',
      );
      this.renderer.appendChild(this.doc.body, this.el);
    }
    this.el!.textContent = this.lfTooltip();
    const rect = this.host.nativeElement.getBoundingClientRect();
    this.renderer.setStyle(this.el, 'left', `${rect.right + 10}px`);
    this.renderer.setStyle(this.el, 'top', `${rect.top + rect.height / 2}px`);
    this.renderer.setStyle(this.el, 'transform', 'translateY(-50%)');
    this.renderer.setAttribute(this.host.nativeElement, 'aria-describedby', this.id);
  }

  hide(): void {
    if (!this.el) return;
    this.renderer.removeChild(this.doc.body, this.el);
    this.renderer.removeAttribute(this.host.nativeElement, 'aria-describedby');
    this.el = null;
  }

  ngOnDestroy(): void {
    this.hide();
  }
}
