import {NgIf, NgOptimizedImage} from '@angular/common';
import {Component, inject, ViewChild} from '@angular/core';
import {RouterLink} from '@angular/router';
import {watchState} from '@ngrx/signals';
import {PrimeTemplate} from 'primeng/api';
import {Button} from 'primeng/button';
import {Sidebar, SidebarModule} from 'primeng/sidebar';

import {UserAuthenticationStore} from '../../../+state/auth/user-auth.store';
import {FeatureFlagsStore} from '../../../+state/feature-flags/feature-flags.store';
import {NotificationsStore} from '../../../+state/notifications/notifications.store';
import {rebaseRoutePath, RoutePath} from '../../../app.routes';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    Button,
    NgIf,
    NgOptimizedImage,
    PrimeTemplate,
    SidebarModule,
    RouterLink,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;
  protected isSidebarVisible: boolean = false;

  protected readonly userAuthenticationStore = inject(UserAuthenticationStore);
  protected readonly featureFlagsStore = inject(FeatureFlagsStore);
  protected readonly notificationsStore = inject(NotificationsStore);

  protected readonly RoutePath = RoutePath;
  protected readonly rebaseRoutePath = rebaseRoutePath;

  constructor() {
    watchState(this.userAuthenticationStore, (state) => {
      this.isSidebarVisible = state.isSidebarOpen;
    });
  }

  closeCallback($event: Event) {
    this.sidebarRef.close($event);
  }
}
