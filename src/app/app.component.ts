import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LayoutService } from './core/services/layout.service';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { TopbarComponent } from './layout/topbar/topbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidebarComponent, TopbarComponent, DashboardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './app.component.scss',
  template: `
    <a href="#main" class="skip-link">Skip to main content</a>
    <lf-sidebar />
    <div
      class="shell"
      [class.is-collapsed]="layout.collapsed()"
      [class.is-mobile]="layout.isMobile()"
    >
      <lf-topbar />
      <main id="main" tabindex="-1" class="outline-none">
        <lf-dashboard />
      </main>
    </div>
  `,
})
export class AppComponent {
  protected readonly layout = inject(LayoutService);
}
