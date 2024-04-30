import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { OrganizationEffects } from './domain/store/effects/organization.effects';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from './domain/store/reducers/app.reducer';
import { REST_CLIENT_SERVICES } from './adapters/rest-client/rest-client-services';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    importProvidersFrom(
      HttpClientModule,
      EffectsModule.forRoot([OrganizationEffects]),
      StoreModule.forRoot(reducers, {
        metaReducers,
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
          strictActionSerializability: true,
          strictStateSerializability: true,
        },
      })
    ),
    ...REST_CLIENT_SERVICES,
  ],
};
