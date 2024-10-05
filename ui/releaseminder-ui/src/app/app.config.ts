import {ApplicationConfig} from '@angular/core';

import {DEFAULT_APP_PROVIDERS} from './default-app-providers';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [...DEFAULT_APP_PROVIDERS, provideAnimationsAsync()],
};
