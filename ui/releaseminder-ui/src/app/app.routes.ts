import {Routes} from '@angular/router';

import {ManageAccountComponent} from './components/pages/_account/manage-account/manage-account.component';
import {ErrorNotFoundComponent} from './components/pages/_errors/error-not-found/error-not-found.component';
import {StripePaymentComponent} from './components/pages/_payment/stripe-payment/stripe-payment.component';
import {LoginComponent} from './components/pages/_users/login/login.component';
import {LoginInProgressComponent} from './components/pages/_users/login-in-progress/login-in-progress.component';
import {LoginSuccessComponent} from './components/pages/_users/login-success/login-success.component';
import {LogoutInProgressComponent} from './components/pages/_users/logout-in-progress/logout-in-progress.component';
import {GoPremiumComponent} from './components/pages/go-premium/go-premium.component';
import {LandingPageComponent} from './components/pages/landing-page/landing-page.component';
import {MainMenuComponent} from './components/pages/main-menu/main-menu.component';
import {NotificationsComponent} from './components/pages/notifications/notifications.component';
import {authGuard} from './guards/auth.guard';
import {reverseAuthGuard} from './guards/reverse-auth.guard';

export enum RoutePath {
  /* ANONYMOUS ROUTES */
  LANDING_PAGE = '',
  LOGIN = 'login',
  LOGIN_IN_PROGRESS = 'login-in-progress',
  LOGIN_SUCCESS = 'login-success',
  LOGOUT_IN_PROGRESS = 'logout-in-progress',
  REGISTER_CONFIRM = 'register/confirm/:tokenValue',
  RESET_PASSWORD = 'reset-password',
  RESET_PASSWORD_CONFIRM = 'reset-password/confirm/:tokenValue',
  /* ERROR ROUTES */
  SERVER_ERROR = 'error/server-error',
  ERROR_NOT_FOUND = 'error/not-found',
  /* LOADING ROUTES */
  STRIPE_PAYMENT = 'stripe-payment',
  /* MAIN MENU ROUTES */
  MAIN_MENU = 'main-menu',
  /* NOTIFICATION ROUTES */
  NOTIFICATIONS = 'notifications',
  /* ACCOUNT ROUTES */
  ACCOUNT_MANAGE = 'account/manage',
  GO_PREMIUM = 'go-premium',
}

export const rebaseRoutePath = (routePath: RoutePath) => `/${routePath}`;
export const rebaseRoutePathAsString = (routePathAsString: string) =>
  `/${routePathAsString}`;

export const routePathParameters = {
  PROPERTY_ID: ':propertyId',
  TOKEN_VALUE: ':tokenValue',
} as const;

export const routes: Routes = [
  {
    path: RoutePath.LANDING_PAGE,
    component: LandingPageComponent,
    title: 'ReleaseMinder',
  },
  {
    path: RoutePath.LOGIN,
    component: LoginComponent,
    title: 'ReleaseMinder | Login',
    canActivate: [reverseAuthGuard],
  },
  {
    path: RoutePath.LOGIN_IN_PROGRESS,
    component: LoginInProgressComponent,
    title: 'ReleaseMinder | Login in Progress',
  },
  {
    path: RoutePath.LOGIN_SUCCESS,
    component: LoginSuccessComponent,
    title: 'ReleaseMinder | Login Success',
  },
  {
    path: RoutePath.LOGOUT_IN_PROGRESS,
    component: LogoutInProgressComponent,
    title: 'ReleaseMinder | Logout in Progress',
  },
  {
    path: RoutePath.STRIPE_PAYMENT,
    component: StripePaymentComponent,
    title: 'ReleaseMinder | Stripe Payment',
  },
  {
    path: RoutePath.GO_PREMIUM,
    component: GoPremiumComponent,
    title: 'ReleaseMinder | Go Premium',
  },
  {
    path: RoutePath.NOTIFICATIONS,
    component: NotificationsComponent,
    title: 'ReleaseMinder | Notifications',
    canActivate: [authGuard],
  },
  {
    path: RoutePath.MAIN_MENU,
    component: MainMenuComponent,
    title: 'ReleaseMinder | Main Menu',
    canActivate: [authGuard],
  },
  {
    path: RoutePath.ACCOUNT_MANAGE,
    component: ManageAccountComponent,
    title: 'ReleaseMinder | Account',
    canActivate: [authGuard],
  },
  {
    path: '**',
    component: ErrorNotFoundComponent,
    title: 'ReleaseMinder | Page Not Found',
  },
];
