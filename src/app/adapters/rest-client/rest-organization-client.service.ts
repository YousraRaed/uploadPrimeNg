import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Organization } from '../../domain/models/organization.model';
import { OrganizationClientService } from '../../domain/outbound/organization-client.service';

@Injectable()
export class RestOrganizationClientService
  implements OrganizationClientService
{
  private static ORGANIZATIONS_ENDPOINT_BASE_URL =
    environment.backendUrl + 'organizations/';

  constructor(private httpClient: HttpClient) {}

  getOrganizations(): Observable<Organization[]> {
    return this.httpClient.get<Organization[]>(
      RestOrganizationClientService.ORGANIZATIONS_ENDPOINT_BASE_URL
    );
  }

  editOrganization(
    id: number,
    organization: Partial<Organization>,
    isLogoEdited?: boolean
  ): Observable<Organization> {
    return this.httpClient.put<Organization>(
      RestOrganizationClientService.ORGANIZATIONS_ENDPOINT_BASE_URL + id,
      { ...organization, isLogoEdited }
    );
  }
}
