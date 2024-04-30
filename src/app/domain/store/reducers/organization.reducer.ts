import { createReducer, on } from '@ngrx/store';
import { Organization } from '../../models/organization.model';
import { OrganizationActions } from '../actions/action-types';

export const organizationFeatureKey = 'organizations';

export interface OrganizationState {
  organizations?: Partial<Organization>[];
  organizationDetails?: Partial<Organization>;
  editedOrganizationLogo?: string;
  logoContentType?: string;
  isLogoEdited?: boolean;
  logoIsValid?: boolean;
}

export const initialState: OrganizationState = {
  organizations: [],
  organizationDetails: undefined,
  editedOrganizationLogo: undefined,
  logoContentType: undefined,
  isLogoEdited: undefined,
  logoIsValid: true,
};

export const organizationReducer = createReducer(
  initialState,
  on(OrganizationActions.OrganizationsLoaded, (state, action) => {
    return {
      ...state,
      organizations: action.organizations,
      editedOrganizationLogo: undefined,
      logoContentType: undefined,
    };
  }),

  on(OrganizationActions.organizationLogoUploaded, (state, action) => {
    return {
      ...state,
      editedOrganizationLogo: action.logoBase64,
      logoContentType: action.logoContentType,
      isLogoEdited: action.isLogoEdited,
    };
  }),
  on(OrganizationActions.setOrganizationLogoValidity, (state, action) => {
    return {
      ...state,
      logoIsValid: action.isValid,
    };
  })
);
