import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private accountService: AccountService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    console.log("AUUUT");
    this.accountService.currentUser$.subscribe(event => console.log(event));

    return this.accountService.currentUser$.pipe(
      map(auth => {
        console.log("AUUUT 2");
        if(auth) return true;
        else {
          this.router.navigate(['/account/login']);
          return false;
        }
      })
    );
  }
  
}
