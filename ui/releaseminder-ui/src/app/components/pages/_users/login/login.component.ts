import {CommonModule, NgOptimizedImage} from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {CheckboxModule} from 'primeng/checkbox';
import {DividerModule} from 'primeng/divider';
import {InputGroupModule} from 'primeng/inputgroup';
import {InputGroupAddonModule} from 'primeng/inputgroupaddon';
import {InputTextModule} from 'primeng/inputtext';
import {MessagesModule} from 'primeng/messages';
import {RippleModule} from 'primeng/ripple';
import {take, tap} from 'rxjs';

import {UserAuthenticationStore} from '../../../../+state/auth/user-auth.store';
import {FeatureFlagsStore} from '../../../../+state/feature-flags/feature-flags.store';
import {FullIssueBoardComponent} from '../../../lib/_board/full-issue-board/full-issue-board.component';
import {LoginSidebarFeatureComponent} from '../../../lib/_users/login-sidebar-feature/login-sidebar-feature.component';
import {PreAlphaMessageComponent} from '../../../lib/messages/pre-alpha-message/pre-alpha-message.component';
import {SplashBannerComponent} from '../../../lib/splash-banner/splash-banner.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ButtonModule,
    CommonModule,
    FormsModule,
    InputTextModule,
    NgOptimizedImage,
    RouterLink,
    FormsModule,
    RouterLink,
    NgOptimizedImage,
    NgOptimizedImage,
    MatProgressSpinnerModule,
    InputGroupAddonModule,
    InputGroupModule,
    ReactiveFormsModule,
    CardModule,
    CheckboxModule,
    RippleModule,
    MessagesModule,
    PreAlphaMessageComponent,
    SplashBannerComponent,
    FullIssueBoardComponent,
    DividerModule,
    LoginSidebarFeatureComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  protected readonly userAuthenticationStore = inject(UserAuthenticationStore);
  protected readonly featureFlagsStore = inject(FeatureFlagsStore);

  private static readonly nextParam = 'next';
  private readonly route = inject(ActivatedRoute);

  ngOnInit() {
    this.route.queryParams
        .pipe(
            take(1),
            tap((queryParams) => {
              if (queryParams[LoginComponent.nextParam]) {
                this.userAuthenticationStore.onLoginPageVisitedWithNext(queryParams[LoginComponent.nextParam]);
              }
            }),
        )
        .subscribe();
  }

  doGoogleLogin() {
    if (!this.featureFlagsStore.isSignInWithGoogleEnabled()) {
      return;
    }
    this.userAuthenticationStore.attemptSupabaseLoginWithGoogle()
        .catch((reason) => console.error(reason));
  }

  doGitHubLogin() {
    if (!this.featureFlagsStore.isSignInWithGitHubEnabled()) {
      return;
    }
    this.userAuthenticationStore.attemptSupabaseLoginWithGitHub()
        .catch((reason) => console.error(reason));
  }
}
