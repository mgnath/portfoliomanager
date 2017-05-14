// app/auth.service.ts

import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class AuthService {
  // Configure Auth0
  lock = new Auth0Lock('RHu18RAQxkq1aGldT7Yb0i08ufuOBjBS', 'neosecu.auth0.com', {});
  static loadingInfo:boolean = false;
  constructor() {
   this.lock.on("authenticated", function(authResult) {
      console.log("authenticated");
        localStorage.setItem("id_token", authResult.idToken);
        localStorage.setItem("accessToken", authResult.accessToken);
      });
  }

  public login() {
    // Call the show method to display the widget.
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
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    //console.log(tokenNotExpired('id_token'));
    
    return tokenNotExpired('id_token');
  }

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
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