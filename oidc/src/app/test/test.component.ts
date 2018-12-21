import { Component, OnInit } from '@angular/core';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
import { authConfig } from '../auth.config';
import { HttpClient } from '@angular/common/http';

interface UserInfo {
  email?: string;
  given_name?: string;
  family_name?: string;
}

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.less']
})
export class TestComponent implements OnInit {

  public firstname: string; 
  public lastname: string;
  public email: string;

  constructor(private http: HttpClient, private oauthService: OAuthService) {
    this.oauthService.configure(authConfig);   
    
    this.oauthService.tryLogin().then(() => {console.log() } );
    var requestUrl: string = "https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=" + this.oauthService.getAccessToken();

    this.http.get(requestUrl).subscribe(data => { 
      var userInfo: UserInfo = data;
      this.email = userInfo.email;
      this.firstname = userInfo.given_name;
      this.lastname = userInfo.family_name;
    });
  }

  ngOnInit() {
  }

  public logout() : void {
    this.oauthService.logOut();
  }

}
