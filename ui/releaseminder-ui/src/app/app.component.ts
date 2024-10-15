import {CommonModule, NgOptimizedImage} from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {PrimeNGConfig} from 'primeng/api';
import {AvatarModule} from 'primeng/avatar';
import {ButtonModule} from 'primeng/button';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {InputSwitchChangeEvent} from 'primeng/inputswitch';
import {MessagesModule} from 'primeng/messages';
import {SidebarModule} from 'primeng/sidebar';
import {ToastModule} from 'primeng/toast';
import {Observable} from 'rxjs';

import {UserAuthenticationStore} from './+state/auth/user-auth.store';
import {FeatureFlagsStore} from './+state/feature-flags/feature-flags.store';
import {PaymentStore} from './+state/payment/payment.store';
import {rebaseRoutePath, RoutePath} from './app.routes';
import {AppService} from './app.service';
import {FooterComponent} from './components/lib/footer/footer.component';
import {ApplicationMessageComponent} from './components/lib/messages/application-message/application-message.component';
import {FreeTrialMessageComponent} from './components/lib/messages/free-trial-message/free-trial-message.component';
import {PreAlphaMessageComponent} from './components/lib/messages/pre-alpha-message/pre-alpha-message.component';
import {
  UpdateOrMaintenanceInProgressMessageComponent,
} from './components/lib/messages/update-or-maintenance-in-progress-message/update-or-maintenance-in-progress-message.component';
import {NavbarComponent} from './components/lib/navbar/navbar.component';
import {SidebarComponent} from './components/lib/sidebar/sidebar.component';
import {ApplicationMessageDto} from './dtos/application-messages/ApplicationMessageDto';
import {ColorScheme, LayoutService} from './layout/service/app.layout.service';
import {ApplicationMessageService} from './services/application-message/application-message.service';
import {AuthService} from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    ToastModule,
    AvatarModule,
    ButtonModule,
    MatProgressSpinner,
    MessagesModule,
    ConfirmDialogModule,
    FooterComponent,
    FreeTrialMessageComponent,
    PreAlphaMessageComponent,
    ApplicationMessageComponent,
    UpdateOrMaintenanceInProgressMessageComponent,
    RouterLink,
    SidebarModule,
    NgOptimizedImage,
    SidebarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'ReleaseMinder';
  protected colorScheme: ColorScheme = 'light';
  protected publicApplicationMessage$: Observable<ApplicationMessageDto[]>;

  protected readonly userAuthenticationStore = inject(UserAuthenticationStore);
  protected readonly featureFlagsStore = inject(FeatureFlagsStore);
  protected readonly paymentStore = inject(PaymentStore);

  protected readonly rebaseRoutePath = rebaseRoutePath;
  protected readonly RoutePath = RoutePath;
  protected readonly Router = Router;

  constructor(
    private readonly router: Router,
    private readonly primengConfig: PrimeNGConfig,
    private readonly layoutService: LayoutService,
    private readonly applicationMessageService: ApplicationMessageService,
    private readonly authService: AuthService,
    private readonly appService: AppService,
  ) {
    this.publicApplicationMessage$ =
      this.applicationMessageService.getPublicApplicationMessage();
    this.appService.initSupabase();
  }

  ngOnInit() {
    this.userAuthenticationStore.userCheckIn();
    this.primengConfig.ripple = true;
    this.layoutService.config.set(AppService.getAppConfig(this.colorScheme));
    if (
      this.authService.getDarkModeSettingFromLocalStorage() &&
      !this.userAuthenticationStore.isDarkMode()
    ) {
      this.userAuthenticationStore.setDarkModeEnabled();
    } else if (
      !this.authService.getDarkModeSettingFromLocalStorage() &&
      this.userAuthenticationStore.isDarkMode()
    ) {
      this.userAuthenticationStore.setLightModeEnabled();
    }
    this.appService.pipeAuthAndDarkModeToggleRouterEvents(this.router);
    this.appService.pipeNextParamAuthEvents(this.router);
    this.appService.initFeatureFlags();
  }

  handleDarkModeToggleEvent($event: InputSwitchChangeEvent) {
    this.appService.handleDarkModeToggleEvent($event);
  }
}
