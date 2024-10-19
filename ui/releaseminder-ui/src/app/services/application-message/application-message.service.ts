import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';

import {TenantStore} from '../../+state/tenant/tenant.store';
import {environment} from '../../../environments/environment';
import {ApplicationMessageDto} from '../../dtos/application-messages/ApplicationMessageDto';

@Injectable({
  providedIn: 'root',
})
export class ApplicationMessageService {
  private readonly httpClient = inject(HttpClient);
  private readonly tenantStore = inject(TenantStore);

  getPublicApplicationMessage() {
    return this.httpClient.get<ApplicationMessageDto[]>(this.tenantStore.getFullRequestUrl(`${environment.APPLICATION_MESSAGES_SERVICE_BASE_URL}/public`));
  }
}
