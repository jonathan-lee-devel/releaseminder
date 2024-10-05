import {Injectable} from '@angular/core';

import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TenantService {
  constructor() { }

  getFullApiPath(path: string) {
    const scheme = (environment.API_ENVIRONMENT === 'dev') ? 'http': 'https';
    const port = (environment.API_ENVIRONMENT === 'dev') ? '8080': '443';
    const tenant = window.location.hostname.toLowerCase().split('.')[0];
    return `${scheme}://${tenant}.${environment.API_ENVIRONMENT}.api.releaseminder.io:${port}/${path}`;
  }
}
