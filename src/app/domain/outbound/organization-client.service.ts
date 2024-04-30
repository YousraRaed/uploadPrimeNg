import { Observable } from 'rxjs';
import { Organization } from '../models/organization.model';
import { InjectionToken } from '@angular/core';

export const ORGANIZATION_CLIENT_SERVICE = new InjectionToken<string>(
  'ORGANIZATION_CLIENT_SERVICE'
);

export interface OrganizationClientService {
  getOrganizations(): Observable<Organization[]>;
  editOrganization(
    id: number,
    organization: Partial<Organization>,
    isLogoEdited?: boolean
  ): Observable<Organization>;
}
