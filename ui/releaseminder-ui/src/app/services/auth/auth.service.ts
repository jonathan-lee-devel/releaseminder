import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';

import {TenantStore} from '../../+state/tenant/tenant.store';
import {environment} from '../../../environments/environment';
import {rebaseRoutePath, rebaseRoutePathAsString, RoutePath} from '../../app.routes';
import {UserProfile} from '../../dtos/auth/UserProfile';
import {RouterUtils} from '../../util/router/Router.utils';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  static readonly darkModeKey = 'dark-mode';
  static readonly userDataKey = 'user-data';
  static readonly accessTokenKey = 'access-token';
  static readonly refreshTokenKey = 'refresh-token';
  static readonly nextParam = 'next';

  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly tenantStore = inject(TenantStore);

  checkIn(userInfo: UserProfile) {
    return this.httpClient.post<{isAcknowledged: boolean}>(
        this.tenantStore.getFullRequestUrl(`${environment.USERS_SERVICE_BASE_URL}/authenticated/check-in`),
        userInfo,
    );
  }

  public redirectIfNotAnonymous() {
    if (
      this.router.url !== '/' &&
      this.router.url !== rebaseRoutePath(RoutePath.RESET_PASSWORD) &&
      !this.router.url.startsWith(
          rebaseRoutePathAsString(RoutePath.STRIPE_PAYMENT),
      ) &&
      !this.router.url.startsWith(
          rebaseRoutePathAsString(
              RoutePath.RESET_PASSWORD_CONFIRM.replace(':tokenValue', ''),
          ),
      ) &&
      !this.router.url.startsWith(
          rebaseRoutePathAsString(
              RoutePath.REGISTER_CONFIRM.replace(':tokenValue', ''),
          ),
      ) &&
      !/^.*\/properties\/[a-zA-Z0-9]+\/invitations\/accept\/[a-zA-Z0-9]+.*$/.exec(
          this.router.url,
      )
    ) {
      // Don't redirect to login page on anonymous pages (first-time visit etc.)
      this.router
          .navigate([rebaseRoutePath(RoutePath.LOGIN)])
          .catch(RouterUtils.navigateCatchErrorCallback);
    }
  }

  public clearUserDataAndTokens() {
    localStorage.removeItem(AuthService.userDataKey);
    localStorage.removeItem(AuthService.accessTokenKey);
    localStorage.removeItem(AuthService.refreshTokenKey);
  }

  // TODO: use profile DTO
  public getUserInfoFromLocalStorage() {
    const userInfo = localStorage.getItem(AuthService.userDataKey);
    return userInfo ? (JSON.parse(userInfo) as UserProfile) : null;
  }

  public setUserInfoInLocalStorage(userInfo: UserProfile) {
    localStorage.setItem(AuthService.userDataKey, JSON.stringify(userInfo));
  }

  public getNextParamFromLocalStorageAndNoReset() {
    return localStorage.getItem(AuthService.nextParam);
  }

  public getNextParamFromLocalStorageAndReset() {
    const next = localStorage.getItem(AuthService.nextParam);
    localStorage.removeItem(AuthService.nextParam);
    return next;
  }

  public setNextParamInLocalStorageIfNotAnonymous(next: string | null) {
    if (
      next?.startsWith('/#') ||
      next === rebaseRoutePath(RoutePath.LANDING_PAGE)
    ) {
      return;
    }
    if (
      next &&
      next !== '/' &&
      next !== rebaseRoutePath(RoutePath.MAIN_MENU) &&
      next !== rebaseRoutePath(RoutePath.LOGIN)
    ) {
      localStorage.setItem(AuthService.nextParam, next);
    } else {
      localStorage.setItem(
          AuthService.nextParam,
          rebaseRoutePath(RoutePath.MAIN_MENU),
      );
    }
  }

  getDarkModeSettingFromLocalStorage() {
    return localStorage.getItem(AuthService.darkModeKey) === 'true';
  }

  setDarkModeSettingInLocalStorage(isDarkMode: boolean) {
    localStorage.setItem(AuthService.darkModeKey, JSON.stringify(isDarkMode));
  }
}
