import { Component, OnInit, HostListener, NgZone } from '@angular/core';
import { JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from '../auth.config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private oauthService: OAuthService, private zone: NgZone) {
   this.oauthService.configure(authConfig);   
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  login() {
     this.oauthService.initImplicitFlow();
  }

  ngOnInit() {
    let self = this;

    chrome.storage.local.get(['accessToken', 'expiresIn', 'grantedScopes'], function (result) {
      self.zone.run(function () {
          if (result.accessToken != undefined && result.expiresIn != undefined && result.grantedScopes != undefined) {
              self.oauthService.storeAccessTokenResponse(result.accessToken, null, result.expiresIn, result.grantedScopes);
              self.router.navigate(['/test']);
          }
      });
  });
  }


}
