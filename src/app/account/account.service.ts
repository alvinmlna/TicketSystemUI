import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject, catchError, map, of, retry, throwError } from 'rxjs';
import { CurrentUser } from '../shared/shared/models/CurrentUser';
import { Router } from '@angular/router';
import { defaultresponse } from '../shared/shared/models/responses/defaultresponse';
import { CurrentUserService } from '../core/services/current-user.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = "https://localhost:7047/api/";

  authenticated = false;

  constructor(private http : HttpClient, 
    private router: Router,
    private currentUserService : CurrentUserService
    ) { }

  login (values: any){
    return this.http.post<CurrentUser>(this.baseUrl + 'auth/login', values)
    .pipe(
      map(user => {
        this.authenticated = true;
        this.currentUserService.savingUser(user);
        return user;
      })
    );
  }

  logout(){
    this.currentUserService.removeUser();
    this.authenticated = false;
    this.router.navigateByUrl('/account/login');
  }

  loadCurrentUser(token: string | null){
    if (token === null) {
      this.authenticated = false;
      return of(null);
    } 

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get<defaultresponse>(this.baseUrl + 'auth', {headers}).pipe(
      map(auth => {
        if (auth) {
          if(auth.isSuccess){
            //Good
            this.authenticated = true;
          } else {
            this.currentUserService.removeUser();
            this.authenticated = false;
          }
          return auth.isSuccess;
        } else {
          return null;
        }
      })
    )
  }
}
