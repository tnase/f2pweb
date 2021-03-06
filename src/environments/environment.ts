// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

//const url = 'http://10.20.107.6:7090/print/f2p/api/v1/';
const url = 'http://localhost:7090/print/f2p/api/v1/';
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
export const API ={
  SAVE_USER : `${url}user/save` ,
  LOGIN_USER : `${url}user/login`,
  ADD_POST : `${url}post/add`,
  GET_USER_POST:`${url}post/postByUser`,
  GET_IMAGE:`${url}post/getImage`

}
