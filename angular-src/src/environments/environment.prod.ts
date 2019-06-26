import { PayPalEnvironment } from 'ngx-paypal'

export const environment = {
  production: true,
  baseURL: 'https://api.bigkatoriginal.com/',
  //baseURL: 'http://localhost:3000/',
  square_locationID: '6MFVA4RWFS7J9',
  square_applicationID: 'sq0idp-Yak-9etL7lbKYvmvaebl9g',
  paypal_environment: PayPalEnvironment.Sandbox,
  /*My*/ paypal_id: 'AXT1w71kl8AN0_iuOdk6rqp2ZM99oKnAOaDKIeS2ZouUdc7M3bswncF5BH5ajQ8nk1aYzS_lUQg3MrCh',
  /*BIG KAT*/ //paypal_id: 'ARb38WIkUT2f8SlKMKIki0LbSn5NauDGrWUcUF6cckmQL2cvJjiK4LvBU8J7j7oeeY4maYeXNyAsuxw8'
};
