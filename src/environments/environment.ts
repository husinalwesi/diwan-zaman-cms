// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  appVersion: '1.1.13',
  USERDATA_KEY: 'authf649fc9a5f55',
  isMockEnabled: true,
  apiUrl: 'http://diwan-zaman.com/api/api.php?type=api&action=',
  // apiUrl: 'https://api.parvice.com/api/admin',
  defaultImg: './assets/media/icons/placeholder-img.png',
  defaultImgEle: './assets/media/icons/default-placeholder-image.png',
  defaultImgEleWhite: './assets/media/icons/default-placeholder-image-white.png',
  userDefaultImg: './assets/media/users/blank.png',
  // Google map config
  agm_api_key: "AIzaSyD3XtWouPlN8kspv1tSJn7NLPT-QRgIfZY",
  agm_latitude: 31.9594683,
  agm_longitude: 35.8576581,
  agm_address: "7th Cir., Amman, Jordan",
  agm_zoom: 12
  // 
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
