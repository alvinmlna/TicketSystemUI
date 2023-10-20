import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject, catchError, map, of, retry, throwError } from 'rxjs';
import { CurrentUser } from '../shared/shared/models/user';
import { Router } from '@angular/router';
import { defaultresponse } from '../shared/shared/models/responses/defaultresponse';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = "https://localhost:7047/api/";

  private currentUserSource = new ReplaySubject<CurrentUser | null>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http : HttpClient, private router: Router) { }

  login (values: any){
    return this.http.post<CurrentUser>(this.baseUrl + 'auth/login', values)
    .pipe(
      map(user => {
        localStorage.setItem('token', user.token);
        this.currentUserSource.next(user);
      })
    );
  }

  logout (){
    localStorage.removeItem('token');
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
          console.log(auth);
          if(auth.isSuccess){
            //Good
            const user : CurrentUser = {email : "", displayName : "", token : token};
            this.currentUserSource.next(user);
          } else {
            localStorage.removeItem('token');
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
