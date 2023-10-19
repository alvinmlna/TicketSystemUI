import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject, catchError, map, retry, throwError } from 'rxjs';
import { CurrentUser } from '../shared/shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = "https://localhost:7047/api/";

  private currentUserSource = new ReplaySubject<CurrentUser | null>(1);
  currentUser$ = this.currentUserSource.asObservable();
  
  constructor(private http : HttpClient) { }

  login (values: any){
    return this.http.post<CurrentUser>(this.baseUrl + 'auth/login', values)
    .pipe(
      map(user => {
        console.log(user);
        localStorage.setItem('token', user.token);
        this.currentUserSource.next(user);
      })
    );
  }
  
}
