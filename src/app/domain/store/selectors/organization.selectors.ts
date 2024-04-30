import { createSelector } from '@ngrx/store';
import { AppState } from '../reducers/app.reducer';
import { OrganizationState } from '../reducers/organization.reducer';

export const selectOrganizationsState = (state: AppState) =>
  state.organizations;

export const selectOrganizations = createSelector(
  selectOrganizationsState,
  (organizationsState: OrganizationState) => {
    return organizationsState.organizations;
  }
);

export const selectEditOrganization = createSelector(
  selectOrganizationsState,
  (organizationsState: OrganizationState) => {
    return organizationsState.organizationDetails;
  }
);

export const selectEditedOrganizationLogoWithContentType = createSelector(
  selectOrganizationsState,
  (organizationsState: OrganizationState) => {
    if (
      organizationsState.editedOrganizationLogo &&
      organizationsState.logoContentType
    )
      return `data:${organizationsState.logoContentType};base64,${organizationsState.editedOrganizationLogo}`;
    else return;
  }
);
export const selectEditedOrganizationLogo = createSelector(
  selectOrganizationsState,
  (organizationsState: OrganizationState) => {
    return organizationsState.editedOrganizationLogo;
  }
);
export const selectEditedOrganizationContentType = createSelector(
  selectOrganizationsState,
  (organizationsState: OrganizationState) => {
    return organizationsState.logoContentType;
  }
);
export const selectEditedOrganizationIsLogoEdited = createSelector(
  selectOrganizationsState,
  (organizationsState: OrganizationState) => {
    return organizationsState.isLogoEdited;
  }
);
export const selectOrganizationLogoIsValid = createSelector(
  selectOrganizationsState,
  (organizationsState: OrganizationState) => {
    return organizationsState.logoIsValid;
  }
);
