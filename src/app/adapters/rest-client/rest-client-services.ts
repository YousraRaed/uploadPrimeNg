import { ORGANIZATION_CLIENT_SERVICE } from '../../domain/outbound/organization-client.service';
import { RestOrganizationClientService } from './rest-organization-client.service';

export const REST_CLIENT_SERVICES = [
  {
    provide: ORGANIZATION_CLIENT_SERVICE,
    useClass: RestOrganizationClientService,
  },
];
