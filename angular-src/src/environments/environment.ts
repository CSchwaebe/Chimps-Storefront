// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { PayPalEnvironment } from 'ngx-paypal'

export const environment = {
  production: false,
  baseURL: 'http://localhost:3000/',
  paypal_environment: PayPalEnvironment.Sandbox,
  paypal_id: 'AXT1w71kl8AN0_iuOdk6rqp2ZM99oKnAOaDKIeS2ZouUdc7M3bswncF5BH5ajQ8nk1aYzS_lUQg3MrCh',
 //BIG KAT paypal_id: 'ARb38WIkUT2f8SlKMKIki0LbSn5NauDGrWUcUF6cckmQL2cvJjiK4LvBU8J7j7oeeY4maYeXNyAsuxw8'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
