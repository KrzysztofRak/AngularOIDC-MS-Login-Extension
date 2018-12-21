// This api will come in the next version

import { AuthConfig } from 'angular-oauth2-oidc';

let extensionUrl = "https://mdkllgdfdjgodinoklmhfckjfkemiehp.chromiumapp.org";
let localUrl = window.location.origin;

export const authConfig: AuthConfig = {
      redirectUri: extensionUrl + '/test',
      logoutUrl: extensionUrl + '/login',
      clientId: '362d0cbe-6390-4659-b4e6-ebcc257fa93c',
      issuer: 'https://login.microsoftonline.com/common/v2.0',
      scope: 'User.Read',
      responseType: 'token id_token',
      skipIssuerCheck: true,
      oidc: true,
      strictDiscoveryDocumentValidation: false,
      disableAtHashCheck: true,

  showDebugInformation: true,

  sessionChecksEnabled: false
};