import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { statussummary } from '../shared/shared/models/responses/statussummary';
import { catchError, retry, throwError } from 'rxjs';
import { last12monthchart } from '../shared/shared/models/responses/last12monthchart';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  baseUrl = "https://localhost:7047/api/";

  constructor(private http: HttpClient) { }

  getStatusSummary(){
    return this.http.get<statussummary[]>(this.baseUrl + 'ticket/statussummary').pipe(retry(1), catchError(this.errorHandl));
  }

  getLast12MonthChart(){
    return this.http.get<last12monthchart>(this.baseUrl + 'dashboard/last12month').pipe(retry(1), catchError(this.errorHandl));
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
