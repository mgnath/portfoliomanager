import {Injectable} from '@angular/core';
import {Router,ActivatedRouteSnapshot, RouterStateSnapshot,CanActivate} from '@angular/router';
import {AuthService} from 'app/core/services/auth.service';
import { Observable } from "rxjs/Observable";

@Injectable()
export class AuthGuard implements CanActivate
{
    constructor(private auth:AuthService, private router:Router){

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
       if (this.auth.authenticated()) {
            console.log('Go In');
            return true;  
        }   
        //this.loginService.setUrlAfterLogin(state.url);
        console.log('No entry');
        this.router.navigate(['login']);
        
        return false;
    }

}