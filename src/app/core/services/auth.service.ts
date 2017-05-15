// app/auth.service.ts

import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { ConfigService } from "app/core/services/config.service";
//import {Auth0Lock} from "auth0-lock";
// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class AuthService {
  lock = new Auth0Lock( ConfigService.AUTH0_KEY, ConfigService.AUTH0_URL, {});
  static loadingInfo:boolean = false;
  constructor() {
   this.lock.on("authenticated", function(authResult) {
        localStorage.setItem("id_token", authResult.idToken);
        localStorage.setItem("accessToken", authResult.accessToken);
      });
  }

  public login() {
    this.lock.show();
  }
  public getUserName(){
    if(tokenNotExpired('id_token'))
    {
      if(localStorage.getItem("profile")){
        return JSON.parse(localStorage.getItem("profile"));
      }
      else {
            if(!AuthService.loadingInfo)
            {
              AuthService.loadingInfo = true;
              this.lock.getUserInfo(localStorage.getItem("accessToken"), function(error, profile) {
                          if (error) {return;}
                          AuthService.loadingInfo = false;
                          localStorage.setItem("profile", JSON.stringify(profile));
                          return profile;
                    });
            }
          return "";
      }
    }
    else{
      return "";
    }
  }
  public authenticated() {
    return tokenNotExpired('id_token');
  }

  public logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    window.location.reload();
  }
}



// let lock2 = new Auth0Lock('RHu18RAQxkq1aGldT7Yb0i08ufuOBjBS', 'neosecu.auth0.com', {});
//       lock2.getUserInfo(authResult.accessToken, function(error, profile) {
//     if (error) {
//       // Handle error
//       return;
//     }

//     // Save token and profile locally
   
//     localStorage.setItem("profile", JSON.stringify(profile));