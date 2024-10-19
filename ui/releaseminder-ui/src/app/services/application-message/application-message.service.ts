import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {environment} from '../../../environments/environment';
import {ApplicationMessageDto} from '../../dtos/application-messages/ApplicationMessageDto';
import {TenantService} from '../tenant/tenant.service';

@Injectable({
  providedIn: 'root',
})
export class ApplicationMessageService {
  constructor(private readonly httpClient: HttpClient, private readonly tenantService: TenantService) { }

  getPublicApplicationMessage() {
    return this.httpClient.get<ApplicationMessageDto[]>(this.tenantService.getFullApiPath(`${environment.APPLICATION_MESSAGES_SERVICE_BASE_URL}/public`));
  }
}
