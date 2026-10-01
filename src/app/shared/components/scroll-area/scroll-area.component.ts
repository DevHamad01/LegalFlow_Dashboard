import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  NgZone,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';

/**
 * Scrollable list well from the design: a #f7f7f7 box (12px radius, 4px padding)
 * with a separate 12px track (#f7f7f7, 19px radius) and an 8px #d1d1d1 thumb beside it.
 *
 * The native scrollbar is hidden and replaced by a synced, draggable custom one so the
 * scrollbar can sit OUTSIDE the grey box exactly like the Figma frame. Native scrolling
 * (wheel, touch, keyboard when focused) still drives everything.
 *
 * Height is controlled by the host: give it `flex-1 min-h-0` inside a sized column, or a
 * `max-h-*` on smaller screens. The track keeps its width even when there is nothing to
 * scroll, so content never shifts.
 */
@Component({
  selector: 'lf-scroll-area',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex min-h-0 min-w-0', '[style.gap.px]': 'gap()' },
  styles: `
    .viewport {
      scrollbar-width: none;
      -ms-overflow-style: none;
      overscroll-behavior: contain;
      &::-webkit-scrollbar { display: none; }
      &:focus-visible { outline: 2px solid #db7658; outline-offset: 2px; }
    }
    .thumb { touch-action: none; }
  `,
  template: `
    <div
      #viewport
      class="viewport min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden rounded-12 bg-surface-50 p-1"
      tabindex="0"
      role="region"
      [attr.aria-label]="label()"
      (scroll)="sync()"
    >
      <div #content><ng-content /></div>
    </div>

    <div
      #track
      class="relative w-3 shrink-0 cursor-pointer overflow-hidden rounded-19 bg-surface-50"
      [class.invisible]="!scrollable()"
      aria-hidden="true"
      (pointerdown)="onTrackPointerDown($event)"
    >
      <div
        class="thumb absolute left-1/2 top-0 w-2 -translate-x-1/2 cursor-grab rounded-12 bg-surface-300 transition-colors hover:bg-ink-400 active:cursor-grabbing"
        [class.!bg-ink-400]="dragging()"
        [style.height.px]="thumbHeight()"
        [style.transform]="'translate(-50%, ' + thumbTop() + 'px)'"
        (pointerdown)="onThumbPointerDown($event)"
      ></div>
    </div>
  `,
})
export class ScrollAreaComponent implements AfterViewInit {
  /** Accessible name of the scroll region (it is focusable for keyboard scrolling). */
  readonly label = input.required<string>();
  /** Space between the grey list box and the track (design: 8px or 10px). */
  readonly gap = input<number>(8);

  private readonly viewport = viewChild.required<ElementRef<HTMLDivElement>>('viewport');
  private readonly content = viewChild.required<ElementRef<HTMLDivElement>>('content');
  private readonly track = viewChild.required<ElementRef<HTMLDivElement>>('track');
  private readonly zone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly scrollable = signal(false);
  protected readonly thumbHeight = signal(0);
  protected readonly thumbTop = signal(2);
  protected readonly dragging = signal(false);

  private static readonly INSET = 2; // thumb sits 2px from track ends (design)
  private static readonly MIN_THUMB = 32;

  ngAfterViewInit(): void {
    const ro = new ResizeObserver(() => this.sync());
    ro.observe(this.viewport().nativeElement);
    ro.observe(this.content().nativeElement);
    ro.observe(this.track().nativeElement);
    this.destroyRef.onDestroy(() => ro.disconnect());
    this.sync();
  }

  /** Recalculate thumb size/position from the viewport's scroll metrics. */
  sync(): void {
    const vp = this.viewport().nativeElement;
    const trackH = this.track().nativeElement.clientHeight;
    const { scrollTop, scrollHeight, clientHeight } = vp;
    const overflow = scrollHeight - clientHeight;
    const canScroll = overflow > 1;

    this.scrollable.set(canScroll);
    if (!canScroll) return;

    const usable = trackH - ScrollAreaComponent.INSET * 2;
    const h = Math.max(ScrollAreaComponent.MIN_THUMB, Math.round((clientHeight / scrollHeight) * usable));
    const top = ScrollAreaComponent.INSET + (scrollTop / overflow) * (usable - h);
    this.thumbHeight.set(h);
    this.thumbTop.set(Math.round(top));
  }

  /** Scroll back to the top, e.g. when the list content is swapped. */
  scrollToTop(): void {
    this.viewport().nativeElement.scrollTo({ top: 0 });
  }

  protected onTrackPointerDown(event: PointerEvent): void {
    if (event.target !== this.track().nativeElement) return;
    const vp = this.viewport().nativeElement;
    const rect = this.track().nativeElement.getBoundingClientRect();
    const ratio = (event.clientY - rect.top) / rect.height;
    vp.scrollTo({ top: ratio * (vp.scrollHeight - vp.clientHeight), behavior: 'smooth' });
  }

  protected onThumbPointerDown(event: PointerEvent): void {
    event.preventDefault();
    const thumb = event.currentTarget as HTMLElement;
    const vp = this.viewport().nativeElement;
    const startY = event.clientY;
    const startScroll = vp.scrollTop;
    const usable = this.track().nativeElement.clientHeight - ScrollAreaComponent.INSET * 2 - this.thumbHeight();
    const ratio = usable > 0 ? (vp.scrollHeight - vp.clientHeight) / usable : 0;

    thumb.setPointerCapture(event.pointerId);
    this.dragging.set(true);

    this.zone.runOutsideAngular(() => {
      const move = (e: PointerEvent) => (vp.scrollTop = startScroll + (e.clientY - startY) * ratio);
      const up = () => {
        thumb.removeEventListener('pointermove', move);
        thumb.removeEventListener('pointerup', up);
        thumb.removeEventListener('pointercancel', up);
        this.zone.run(() => this.dragging.set(false));
      };
      thumb.addEventListener('pointermove', move);
      thumb.addEventListener('pointerup', up);
      thumb.addEventListener('pointercancel', up);
    });
  }
}
