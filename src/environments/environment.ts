// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCDJRFNBUoZ0RGaZ6FX2lxF2DgMuLNtKM4',
    authDomain: 'evalation-test.firebaseapp.com',
  },
  backendUrl: 'http://localhost:3000/',
  frontendUrl: 'http://localhost:4200/',
  title: 'Evalation Dev',
  privacyPolicyCreationDate: new Date('2023-06-08 00:00:00'),
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
