import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from '../shared/shared/models/responses/user';
import { catchError, retry, throwError } from 'rxjs';
import { userregisterrequest } from '../shared/shared/models/request/user-register-request';
import { userupdaterequest } from '../shared/shared/models/request/user-update-request';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = "https://localhost:7047/api/";

  constructor(private http: HttpClient) { }

  getAll(search : string | null) {
    return this.http.get<user[]>(this.baseUrl + "user?search=" + search).pipe(retry(1), catchError(this.errorHandl));
    // if(search) {
    // } 
    //   else 
    // {
    //   return this.http.get<user[]>(this.baseUrl + "user").pipe(retry(1), catchError(this.errorHandl));
    // }
  }
  
  getUserById(id: number){
    return this.http.get<user>(this.baseUrl + 'user/' + id).pipe(retry(1), catchError(this.errorHandl));
  }

  addUser(user: userregisterrequest){
    const formData = new FormData();
    formData.append('email', user.email.toString());
    formData.append('name', user.name.toString());
    formData.append('password', user.password.toString());
    formData.append('roleId', user.roleId.toString());
    return this.http.post<userregisterrequest>(this.baseUrl + 'user', formData).pipe(retry(1), catchError(this.errorHandl));
  }
  
  editUser(ticket: userupdaterequest){
    return this.http.put<userupdaterequest>(this.baseUrl + 'user', ticket).pipe(retry(1), catchError(this.errorHandl));
  }

  deleteUser(id : number){
    console.log(id);
    return this.http.delete(this.baseUrl + 'User/' + id).pipe(retry(1), catchError(this.errorHandl));
  }

  errorHandl(error : any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
