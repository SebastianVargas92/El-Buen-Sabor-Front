import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  isLoged: any;
 
  constructor(private authService: AuthService, private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      const expectedRol = next.data.expectedRol;
      this.isLoged = localStorage.getItem('loged');
      let rol = localStorage.getItem('rol');
      console.log("El rol desde la guard es : ", rol)
   
      if(this.isLoged && expectedRol.indexOf(rol) !== -1){
       return true;
      }else{
        this.router.navigate(['user/login']);
        return false;
      }
     
  }
}
