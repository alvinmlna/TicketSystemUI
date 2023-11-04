import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CurrentUserService } from '../services/current-user.service';
import Utils from 'src/app/shared/shared/Helpers/utils';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardGuard implements CanActivate {

  constructor(private currentUser : CurrentUserService,
    private router : Router
    ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    alert("here 2");
    var currentUser = this.currentUser.getUser();
    if(currentUser){
      if(currentUser.roleId) {
        var result = this.Verify(route.data['role'], currentUser.roleId);
        if(result) return true;
      }
    }
    this.router.navigate(['/unauthorized']);
    return false;
  }
  

  Verify(roles : string, userRole: string)
  {
    const arr = roles.split(',');
    let userRoleId = Utils.convertToRole(+userRole);
    return arr.includes(userRoleId);
  }


  
}
