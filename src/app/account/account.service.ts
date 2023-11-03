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

  private currentUserSource = new ReplaySubject<CurrentUser | null>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http : HttpClient, 
    private router: Router,
    private currentUserService : CurrentUserService
    ) { }

  login (values: any){
    return this.http.post<CurrentUser>(this.baseUrl + 'auth/login', values)
    .pipe(
      map(user => {
        this.currentUserSource.next(user);
        this.currentUserService.savingUser(user);
      })
    );
  }

  logout (){
    this.currentUserService.removeUser();
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/account/login');
  }
  
  loadCurrentUser(token: string | null){
    if (token === null) {
      this.currentUserSource.next(null);
      return of(null);
    } 

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get<defaultresponse>(this.baseUrl + 'auth', {headers}).pipe(
      map(auth => {
        if (auth) {
          if(auth.isSuccess){
            //Good
            const user : CurrentUser = {email : null, displayName : null, userId : null , token : token, imagePath : null};
            this.currentUserSource.next(user);
          } else {
            this.currentUserService.removeUser();
            this.currentUserSource.next(null);
          }
          return auth.isSuccess;
        } else {
          return null;
        }
      })
    )
  }
}
