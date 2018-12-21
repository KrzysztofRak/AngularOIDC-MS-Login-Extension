import { Component, OnInit } from '@angular/core';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
import { authConfig } from '../auth.config';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

interface UserInfo {
  displayName?: string;
  userPrincipalName?: string;
}

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.less']
})
export class TestComponent implements OnInit {

  public displayName: string; 
  public userPrincipalName: string;

  constructor(private http: HttpClient, private oauthService: OAuthService, private router: Router) {
    this.oauthService.configure(authConfig);   
    this.oauthService.tryLogin().then(() => {console.log() } );

   const headersDict = {
    'Authorization': 'Bearer ' + this.oauthService.getAccessToken(),
    'Content-Type': 'application/json'
   };

   const requestOptions = {
     headers: new HttpHeaders(headersDict)
   }

    var requestUrl: string = "https://graph.microsoft.com/v1.0/users/me";

    this.http.get(requestUrl, requestOptions).subscribe(data => { 
      var userInfo: UserInfo = data;
      this.displayName = userInfo.displayName;
      this.userPrincipalName = userInfo.userPrincipalName;
    });
  }

  ngOnInit() {
  }

  public logout() : void {
    this.oauthService.logOut();
    chrome.storage.local.clear();
    this.router.navigate(['/login']);
  }

}
