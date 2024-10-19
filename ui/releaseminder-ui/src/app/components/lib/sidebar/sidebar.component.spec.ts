import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {signalStore, withState} from '@ngrx/signals';
import {ConfirmationService, MessageService} from 'primeng/api';

import {SidebarComponent} from './sidebar.component';
import {UserAuthenticationState, UserAuthenticationStore} from '../../../+state/auth/user-auth.store';
import {FeatureFlagsState, FeatureFlagsStore} from '../../../+state/feature-flags/feature-flags.store';
import {NotificationsState, NotificationsStore} from '../../../+state/notifications/notifications.store';

class MockDocument {
  getElementById() {
    return {href: '12345'};
  }
}

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    const userAuthenticationStore = signalStore(
        {providedIn: 'root'},
        withState<UserAuthenticationState>(
            {
              loggedInState: 'NOT_LOGGED_IN',
              userInfo: {
                email: '',
                displayName: '',
              },
              isDarkMode: false,
              isSidebarOpen: false,
            },
        ));

    const featureFlagsStore = signalStore({providedIn: 'root'}, withState<FeatureFlagsState>({
      featureFlags: [],
      isLoading: false,
    }));

    const notificationsStore = signalStore({providedIn: 'root'}, withState<NotificationsState>({
      notifications: [],
      isLoading: false,
    }));

    await TestBed.configureTestingModule({
      imports: [SidebarComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: typeof UserAuthenticationStore,
          useValue: userAuthenticationStore,
        },
        {
          provide: typeof FeatureFlagsStore,
          useValue: featureFlagsStore,
        },
        {
          provide: typeof NotificationsStore,
          useValue: notificationsStore,
        },
        {
          provide: ConfirmationService,
          useValue: {},
        },
        {
          provide: MessageService,
          useValue: {},
        },
        {
          provide: Document,
          useClass: MockDocument,
        },
      ],
    })
        .compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
