import { createAction, props } from '@ngrx/store';
import { Organization } from '../../models/organization.model';
import { OrganizationActionNamesEnum, PrefixEnum } from './action-names.enum';

export const loadOrganizations = createAction(
  '[Side Menu] Load Organizations',
  (
    pending: string = `${PrefixEnum.BEGIN}_${OrganizationActionNamesEnum.LOAD_ORGANIZATIONS}`
  ) => ({
    pending,
  })
);
export const OrganizationsLoaded = createAction(
  '[Load Organizations Effect] Organizations Loaded',
  (
    organizations: Partial<Organization>[],
    pending: string = `${PrefixEnum.END}_${OrganizationActionNamesEnum.LOAD_ORGANIZATIONS}`
  ) => ({
    organizations,
    pending,
  })
);

export const updateOrganization = createAction(
  '[Organization Edit Page] Edit Organization',
  (
    organization: Partial<Organization>,
    pending: string = `${PrefixEnum.BEGIN}_${OrganizationActionNamesEnum.UPDATE_ORGANIZATION}`
  ) => ({ organization, pending })
);

export const organizationUpdated = createAction(
  '[Organizations Effect] Organization Edited',
  (
    organization: Partial<Organization>,
    pending: string = `${PrefixEnum.END}_${OrganizationActionNamesEnum.UPDATE_ORGANIZATION}`,
    success: string = `${OrganizationActionNamesEnum.UPDATE_ORGANIZATION}`
  ) => ({ organization, pending, success })
);

export const organizationLogoUploaded = createAction(
  '[Organizations Edit Page] Organization Logo Uploaded',
  props<{
    logoBase64?: string;
    logoContentType?: string;
    isLogoEdited?: boolean;
  }>()
);

export const setOrganizationLogoValidity = createAction(
  '[Organizations Edit Page] Organization Uploaded Logo Validity',
  props<{
    isValid?: boolean;
  }>()
);
