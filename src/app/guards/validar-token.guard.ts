import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate, CanLoad {

  constructor(private authservice:AuthService,
              private route:Router){}

   canActivate(): Observable<boolean> | boolean {
//    console.log("CanActivate")
    return this.authservice.validarToken()
    .pipe(
      tap( resp=>{
        if(!resp){
            this.route.navigateByUrl('/auth')
        }
      })
    )
   
  }
  canLoad(): Observable<boolean> | boolean  {
    //console.log("CanLoad")
    return this.authservice.validarToken()
    .pipe(
      tap( resp=>{
        if(!resp){
            this.route.navigateByUrl('/auth')
        }
      })
    )
  }
}
