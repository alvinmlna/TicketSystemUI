import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { BehaviorSubject, EMPTY, Observable, catchError, isEmpty, map, of, throwError } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  showModal$ = new BehaviorSubject<boolean>(false);

  constructor(private accountService: AccountService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    if(this.accountService.authenticated){
      return true;
    } 
      else 
    {
      this.router.navigate(['/account/login']);
      return false;
    }
  }
}
