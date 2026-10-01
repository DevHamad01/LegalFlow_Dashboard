import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IconName } from './icon.types';

/**
 * Inline SVG icon set, drawn on a 24×24 grid with a 1.5px stroke to match the
 * outline style used in the Figma file. Colour follows `currentColor`.
 * Decorative by default (aria-hidden); pass `label` to expose it to assistive tech.
 */
@Component({
  selector: 'lf-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'inline-flex shrink-0 items-center justify-center',
    '[style.width.px]': 'size()',
    '[style.height.px]': 'size()',
  },
  template: `
    <svg
      viewBox="0 0 24 24"
      [attr.width]="size()"
      [attr.height]="size()"
      fill="none"
      stroke="currentColor"
      [attr.stroke-width]="strokeWidth()"
      stroke-linecap="round"
      stroke-linejoin="round"
      [attr.aria-hidden]="label() ? null : 'true'"
      [attr.role]="label() ? 'img' : null"
      [attr.aria-label]="label()"
      focusable="false"
    >
      @switch (name()) {
        @case ('home') {
          <path d="M3.75 10.2 12 3.75l8.25 6.45V19.5a.75.75 0 0 1-.75.75h-4.5v-6h-6v6H4.5a.75.75 0 0 1-.75-.75z" />
        }
        @case ('calendar') {
          <rect x="3.75" y="5.25" width="16.5" height="15" rx="2.25" />
          <path d="M3.75 9.75h16.5M8.25 3v4.5M15.75 3v4.5" />
        }
        @case ('calendar-event') {
          <rect x="3.75" y="5.25" width="16.5" height="15" rx="2.25" />
          <path d="M3.75 9.75h16.5M8.25 3v4.5M15.75 3v4.5" />
          <rect x="7.5" y="13" width="3.5" height="3.5" rx=".75" fill="currentColor" stroke="none" />
        }
        @case ('calendar-empty') {
          <rect x="3.75" y="5.25" width="16.5" height="15" rx="2.25" />
          <path d="M3.75 9.75h16.5M8.25 3v4.5M15.75 3v4.5M9.75 13.5l4.5 4.5M14.25 13.5l-4.5 4.5" />
        }
        @case ('list') {
          <path d="M9 6.75h11.25M9 12h11.25M9 17.25h11.25" />
          <circle cx="4.5" cy="6.75" r=".9" fill="currentColor" stroke="none" />
          <circle cx="4.5" cy="12" r=".9" fill="currentColor" stroke="none" />
          <circle cx="4.5" cy="17.25" r=".9" fill="currentColor" stroke="none" />
        }
        @case ('list-checks') {
          <path d="M11.25 6.75h9M11.25 12h9M11.25 17.25h9" />
          <path d="m3.75 6.75 1.5 1.5 3-3M3.75 12.75l1.5 1.5 3-3" />
          <circle cx="5.25" cy="17.75" r="1.5" />
        }
        @case ('clock') {
          <circle cx="12" cy="12" r="8.25" />
          <path d="M12 7.5V12l3 1.875" />
        }
        @case ('mail') {
          <rect x="3" y="5.25" width="18" height="13.5" rx="2.25" />
          <path d="m3.75 6.75 8.25 6 8.25-6" />
        }
        @case ('contacts') {
          <rect x="4.5" y="3" width="15" height="18" rx="2.25" />
          <circle cx="12" cy="10.125" r="2.625" />
          <path d="M7.875 17.25c.6-1.95 2.25-3 4.125-3s3.525 1.05 4.125 3M2.75 7.5H4.5M2.75 12H4.5M2.75 16.5H4.5" />
        }
        @case ('briefcase') {
          <rect x="3" y="6.75" width="18" height="13.5" rx="2.25" />
          <path d="M8.25 6.75V5.25A1.5 1.5 0 0 1 9.75 3.75h4.5a1.5 1.5 0 0 1 1.5 1.5v1.5M3 12.375c2.7 1.5 5.775 2.25 9 2.25s6.3-.75 9-2.25M12 12v1.5" />
        }
        @case ('folder') {
          <path d="M3 7.5A2.25 2.25 0 0 1 5.25 5.25h3.69a1.5 1.5 0 0 1 1.06.44l1.56 1.56h7.19A2.25 2.25 0 0 1 21 9.5v8.25A2.25 2.25 0 0 1 18.75 20H5.25A2.25 2.25 0 0 1 3 17.75z" />
          <path d="M3 10.5h18" />
        }
        @case ('file') {
          <path d="M13.5 3H7.5A2.25 2.25 0 0 0 5.25 5.25v13.5A2.25 2.25 0 0 0 7.5 21h9a2.25 2.25 0 0 0 2.25-2.25V8.25z" />
          <path d="M13.5 3v5.25h5.25M9 12.75h6M9 16.5h4.5" />
        }
        @case ('chat') {
          <path d="M20.25 11.625c0 4.142-3.694 7.5-8.25 7.5a8.9 8.9 0 0 1-3.17-.58L3.75 20.25l1.53-3.83A7.07 7.07 0 0 1 3.75 11.625c0-4.142 3.694-7.5 8.25-7.5s8.25 3.358 8.25 7.5" />
          <path d="M8.25 11.625h.008M12 11.625h.008M15.75 11.625h.008" stroke-width="2.25" />
        }
        @case ('user-circle') {
          <circle cx="12" cy="12" r="8.25" />
          <circle cx="12" cy="10.125" r="2.625" />
          <path d="M6.75 18.375c.9-1.95 2.85-3.375 5.25-3.375s4.35 1.425 5.25 3.375" />
        }
        @case ('building') {
          <path d="M3.75 20.25h16.5M5.25 20.25V4.5a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 .75.75v15.75M14.25 9h3.75a.75.75 0 0 1 .75.75v10.5" />
          <path d="M8.25 7.5h3M8.25 11.25h3M8.25 15h3" />
        }
        @case ('wallet') {
          <rect x="3" y="6" width="18" height="13.5" rx="2.25" />
          <path d="M3 9.75h18M15.75 15h1.5" />
        }
        @case ('users') {
          <circle cx="9" cy="8.25" r="3.375" />
          <path d="M2.625 19.5c.75-3 3.3-4.875 6.375-4.875s5.625 1.875 6.375 4.875M15.375 5.1a3.375 3.375 0 0 1 0 6.3M17.625 14.85c1.95.6 3.3 2.25 3.75 4.65" />
        }
        @case ('grid') {
          <rect x="3.75" y="3.75" width="6.75" height="6.75" rx="1.5" />
          <rect x="13.5" y="3.75" width="6.75" height="6.75" rx="3.375" />
          <rect x="3.75" y="13.5" width="6.75" height="6.75" rx="1.5" />
          <rect x="13.5" y="13.5" width="6.75" height="6.75" rx="1.5" />
        }
        @case ('report') {
          <path d="M14.25 3H6.75A2.25 2.25 0 0 0 4.5 5.25v13.5A2.25 2.25 0 0 0 6.75 21h10.5a2.25 2.25 0 0 0 2.25-2.25V8.25z" />
          <path d="M14.25 3v5.25h5.25M8.25 17.25v-3M12 17.25V12M15.75 17.25v-1.5" />
        }
        @case ('settings') {
          <path d="M10.33 4.32c.43-1.76 2.91-1.76 3.34 0a1.72 1.72 0 0 0 2.57 1.06c1.54-.94 3.31.82 2.37 2.37a1.72 1.72 0 0 0 1.06 2.57c1.76.43 1.76 2.91 0 3.34a1.72 1.72 0 0 0-1.06 2.57c.94 1.54-.82 3.31-2.37 2.37a1.72 1.72 0 0 0-2.57 1.06c-.43 1.76-2.91 1.76-3.34 0a1.72 1.72 0 0 0-2.57-1.06c-1.54.94-3.31-.82-2.37-2.37a1.72 1.72 0 0 0-1.06-2.57c-1.76-.43-1.76-2.91 0-3.34a1.72 1.72 0 0 0 1.06-2.57c-.94-1.54.82-3.31 2.37-2.37a1.72 1.72 0 0 0 2.57-1.06" />
          <circle cx="12" cy="12" r="3" />
        }
        @case ('dot') {
          <circle cx="12" cy="12" r="2.25" fill="currentColor" stroke="none" />
        }
        @case ('chevron-down') {
          <path d="m6 9 6 6 6-6" />
        }
        @case ('chevrons-right') {
          <path d="m6 6.75 5.25 5.25L6 17.25M12.75 6.75 18 12l-5.25 5.25" />
        }
        @case ('more-vertical') {
          <circle cx="12" cy="5.25" r="1.25" fill="currentColor" stroke="none" />
          <circle cx="12" cy="12" r="1.25" fill="currentColor" stroke="none" />
          <circle cx="12" cy="18.75" r="1.25" fill="currentColor" stroke="none" />
        }
        @case ('search') {
          <circle cx="11" cy="11" r="6.75" />
          <path d="m20.25 20.25-4.5-4.5" />
        }
        @case ('bell') {
          <path d="M6 9.75a6 6 0 0 1 12 0c0 3.75.75 5.625 1.5 6.75H4.5c.75-1.125 1.5-3 1.5-6.75" />
          <path d="M9.75 19.5a2.25 2.25 0 0 0 4.5 0" />
          <circle cx="18" cy="5.25" r="2.25" fill="#fb3748" stroke="#fff" stroke-width="1.25" />
        }
        @case ('sparkles') {
          <path d="M4.5 3.75h9a1.5 1.5 0 0 1 1.5 1.5v3M4.5 3.75A1.5 1.5 0 0 0 3 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6" />
          <path d="M16.5 11.25c.45 2.25 1.5 3.3 3.75 3.75-2.25.45-3.3 1.5-3.75 3.75-.45-2.25-1.5-3.3-3.75-3.75 2.25-.45 3.3-1.5 3.75-3.75M7 8.25h4.5M7 12h3" />
        }
        @case ('checklist') {
          <path d="m3.75 6.375 1.5 1.5 3-3M3.75 13.875l1.5 1.5 3-3M11.25 6.75h9M11.25 14.25h9M11.25 18.75h6" />
        }
        @case ('receipt') {
          <path d="M5.25 3.75h13.5v16.5l-2.25-1.5-2.25 1.5-2.25-1.5-2.25 1.5-2.25-1.5-2.25 1.5z" />
          <path d="M8.625 8.25h6.75M8.625 12h6.75M8.625 15.75h3.75" />
        }
        @case ('coins') {
          <ellipse cx="9" cy="6.75" rx="5.25" ry="2.25" />
          <path d="M3.75 6.75v4.5c0 1.243 2.35 2.25 5.25 2.25s5.25-1.007 5.25-2.25v-4.5" />
          <path d="M9.75 15.6c.6.1 1.25.15 1.875.15 2.9 0 5.25-1.007 5.25-2.25" />
          <ellipse cx="15" cy="13.5" rx="5.25" ry="2.25" />
          <path d="M9.75 13.5v4.5c0 1.243 2.35 2.25 5.25 2.25s5.25-1.007 5.25-2.25v-4.5" />
        }
        @case ('trend-up') {
          <path d="M5.25 18.75 18.75 5.25M8.25 5.25h10.5v10.5" />
        }
        @case ('trend-down') {
          <path d="M5.25 5.25 18.75 18.75M18.75 8.25v10.5H8.25" />
        }
        @case ('arrow-up-right') {
          <path d="M7.5 16.5 16.5 7.5M8.625 7.5H16.5v7.875" />
        }
        @case ('download') {
          <path d="M12 3.75v11.25M7.5 10.5 12 15l4.5-4.5M4.5 19.5h15" />
        }
        @case ('file-pdf') {
          <path d="M14.25 2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v15a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V7.5z" fill="#fb3748" stroke="none" />
          <path d="M14.25 2.25V6a1.5 1.5 0 0 0 1.5 1.5h3.75z" fill="#ffb3ba" stroke="none" />
          <path d="M8.25 12.75h7.5M8.25 15.75h4.5" stroke="#fff" />
        }
        @case ('video') {
          <rect x="2.25" y="6" width="13.5" height="12" rx="2.25" fill="#f6b51e" stroke="none" />
          <path d="M15.75 10.2 21 7.125v9.75L15.75 13.8z" fill="#f6b51e" stroke="none" />
          <path d="M5.25 9.75h4.5" stroke="#fff" />
        }
        @case ('menu') {
          <path d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
        }
        @case ('close') {
          <path d="M6 6l12 12M18 6 6 18" />
        }
      }
    </svg>
  `,
})
export class IconComponent {
  readonly name = input.required<IconName>();
  readonly size = input<number>(16);
  readonly strokeWidth = input<number>(1.5);
  /** Accessible name. Leave empty for decorative icons. */
  readonly label = input<string | null>(null);
}
