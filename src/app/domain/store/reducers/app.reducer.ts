import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../../environments/environment';
import {
  organizationFeatureKey,
  organizationReducer,
  OrganizationState,
} from './organization.reducer';

export interface AppState {
  [organizationFeatureKey]: OrganizationState;
}

export const reducers: ActionReducerMap<AppState> = {
  [organizationFeatureKey]: organizationReducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
