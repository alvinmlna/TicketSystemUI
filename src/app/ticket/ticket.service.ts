import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product2, ticket } from '../shared/shared/models/ticket';
import { editticketrequest } from '../shared/shared/models/editticketrequest';
import { catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  baseUrl = "https://localhost:7047/api/";
  ticket : ticket | any;

  constructor(private http: HttpClient) { }

  getTicketById(id: number){
    return this.http.get<ticket>(this.baseUrl + 'ticket/' + id).pipe(retry(1), catchError(this.errorHandl));
  }

  editTicket(ticket: editticketrequest){
    return this.http.put<ticket>(this.baseUrl + 'ticket', ticket).pipe(retry(1), catchError(this.errorHandl));
  }

  uploadFileById(formData : FormData, ticketid : any){
    return this.http.post(this.baseUrl + 'upload/' + ticketid, formData, {reportProgress: true, observe: 'events'}).pipe(retry(1), catchError(this.errorHandl));
  }

  public downloadFile(filename: string) {
    return this.http.get(this.baseUrl + 'file/' + filename, 
    {observe: 'response', responseType: 'blob'});
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
