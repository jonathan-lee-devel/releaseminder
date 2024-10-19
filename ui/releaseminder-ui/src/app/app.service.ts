import {inject, Injectable} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import flagsmith from 'flagsmith';
import {InputSwitchChangeEvent} from 'primeng/inputswitch';
import {filter, tap} from 'rxjs';

import {environment} from '../environments/environment';
import {UserAuthenticationStore} from './+state/auth/user-auth.store';
import {FeatureFlagsStore} from './+state/feature-flags/feature-flags.store';
import {NotificationsStore} from './+state/notifications/notifications.store';
import {PaymentStore} from './+state/payment/payment.store';
import {FeatureFlagEnum} from './enums/FeatureFlag.enum';
import {AppConfig, ColorScheme} from './layout/service/app.layout.service';
import {AuthService} from './services/auth/auth.service';
import {SupabaseService} from './services/supabase/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private static readonly REFRESH_EVENT_ID = 1;

  private readonly userAuthenticationStore = inject(UserAuthenticationStore);
  private readonly featureFlagsStore = inject(FeatureFlagsStore);
  private readonly paymentStore = inject(PaymentStore);
  private readonly notificationsStore = inject(NotificationsStore);
  private readonly supabaseService = inject(SupabaseService);
  private readonly authService = inject(AuthService);

  handleDarkModeToggleEvent($event: InputSwitchChangeEvent) {
    if ($event.checked) {
      this.userAuthenticationStore.setDarkModeEnabled();
    } else {
      this.userAuthenticationStore.setLightModeEnabled();
    }
  }

  pipeAuthAndDarkModeToggleRouterEvents(router: Router) {
    router.events
        .pipe(
            tap(() => {
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
            }),
            filter(
                (routerEvent): routerEvent is NavigationEnd =>
                  routerEvent instanceof NavigationEnd,
            ),
            filter((event) => event.id === AppService.REFRESH_EVENT_ID),
            tap(() => {
              this.userAuthenticationStore.checkLoginOnRefresh();
            }),
            filter(
                () => this.userAuthenticationStore.loggedInState() === 'LOGGED_IN',
            ),
            tap(() => {
              this.notificationsStore.loadNotifications();
              this.paymentStore.loadPaymentStatus();
            }),
        )
        .subscribe();
  }

  pipeNextParamAuthEvents(router: Router) {
    router.events
        .pipe(
            filter(
                (routerEvent): routerEvent is NavigationEnd =>
                  routerEvent instanceof NavigationEnd,
            ),
            tap((event) => {
              this.authService.setNextParamInLocalStorageIfNotAnonymous(event.url);
            }),
        )
        .subscribe();
  }

  initSupabase() {
    this.supabaseService.authChanges((_, session) => {
      if (!session?.access_token) {
        return;
      }
      this.userAuthenticationStore
          .onLoginComplete(
              {
                accessToken: session?.access_token ?? '',
                refreshToken: session?.refresh_token ?? '',
              },
              {
                email: session?.user?.email ?? '',
                displayName: session?.user?.user_metadata?.['name'] ?? '',
              },
          )
          .then(() => {
            if (
              this.userAuthenticationStore.loggedInState() === 'LOGGED_IN' &&
            this.supabaseService.session
            ) {
              this.userAuthenticationStore.userCheckIn();
              this.paymentStore.loadPaymentStatus();
              this.notificationsStore.loadNotifications();
            }
          });
    });
  }

  initFeatureFlags() {
    this.featureFlagsStore.onFeatureFlagsInit();
    flagsmith
        .init({
          environmentID: environment.FLAGSMITH_CLIENT_SDK_KEY,
          api: environment.FLAGSMITH_API_URL,
          onChange: () => {
            this.featureFlagsStore.onFeatureFlagsLoaded(
                [...Object.values(FeatureFlagEnum)
                    .map((flag) => ({
                      featureName: flag,
                      isActive: flagsmith.hasFeature(flag),
                    }))]);
          },
        })
        .catch((reason) => console.error(reason));
  }

  static getAppConfig(colorScheme: ColorScheme): AppConfig {
    return {
      ripple: true,
      inputStyle: 'outlined',
      menuMode: 'slim-plus',
      colorScheme,
      theme: 'blue',
      layoutTheme: 'colorScheme',
      scale: 14,
    };
  }
}
