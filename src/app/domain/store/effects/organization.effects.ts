import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs';

import {
  OrganizationClientService,
  ORGANIZATION_CLIENT_SERVICE,
} from '../../outbound/organization-client.service';
import { OrganizationActions } from '../actions/action-types';
import {
  OrganizationsLoaded,
  organizationUpdated,
} from '../actions/organization.actions';
import { AppState } from '../reducers/app.reducer';
import {
  selectEditedOrganizationContentType,
  selectEditedOrganizationIsLogoEdited,
  selectEditedOrganizationLogo,
} from '../selectors/organization.selectors';

@Injectable()
export class OrganizationEffects {
  loadOrganizations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrganizationActions.loadOrganizations),
      switchMap((action) => {
        return this.organizationClientService.getOrganizations();
      }),
      map((organizations) => {
        return OrganizationsLoaded(organizations);
      })
    )
  );

  editOrganization$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrganizationActions.updateOrganization),
      withLatestFrom(
        this.store.select(selectEditedOrganizationLogo),
        this.store.select(selectEditedOrganizationContentType),
        this.store.select(selectEditedOrganizationIsLogoEdited)
      ),
      switchMap(([action, logoBase64, logoContentType, isLogoEdited]) => {
        return this.organizationClientService.editOrganization(
          action.organization.id || 0,
          { ...action.organization, logoBase64, logoContentType },
          isLogoEdited
        );
      }),
      map((organization) => {
        return organizationUpdated(organization);
      })
    )
  );
  constructor(
    private actions$: Actions,
    @Inject(ORGANIZATION_CLIENT_SERVICE)
    private organizationClientService: OrganizationClientService,
    private store: Store<AppState>
  ) {}
}
