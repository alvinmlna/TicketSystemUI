import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Product2, ticket } from '../shared/shared/models/ticket';
import { editticketrequest } from '../shared/shared/models/editticketrequest';
import { catchError, retry, throwError } from 'rxjs';
import { ListTicketRequest } from '../shared/shared/models/request/listticketrequest';
import { statussummary } from '../shared/shared/models/responses/statussummary';
import { addticketrequest } from '../shared/shared/models/request/addticketrequest';
import { LayoutServiceService } from '../core/services/layout-service.service';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  baseUrl = "https://localhost:7047/api/";
  ticket : ticket | any;

  constructor(
    private http: HttpClient,
    private layoutService: LayoutServiceService ){ }

  getStatusSummary(){
    return this.http.get<statussummary[]>(this.baseUrl + 'ticket/statussummary').pipe(retry(1), catchError(this.errorHandl));
  }

  getTicketById(id: number){
    return this.http.get<ticket>(this.baseUrl + 'ticket/' + id).pipe(retry(1), catchError(this.errorHandl));
  }
  
  addTicket(ticket: addticketrequest){
    return this.http.post<ticket>(this.baseUrl + 'ticket', ticket).pipe(retry(1), catchError(this.errorHandl));
  }

  editTicket(ticket: editticketrequest){
    return this.http.put<ticket>(this.baseUrl + 'ticket', ticket).pipe(retry(1), catchError(this.errorHandl));
  }

  uploadFileById(formData : FormData, ticketid : any){
    return this.http.post(this.baseUrl + 'upload/' + ticketid, formData, {reportProgress: true, observe: 'events'}).pipe(retry(1), catchError(this.errorHandl));
  }

  getTickets(request : ListTicketRequest) {
    let params: HttpParams = new HttpParams()
        .set('summary', request.summary);

    request.productId.forEach(element => {
      params = params.append('productid', element);
    });
    
    request.categoryId.forEach(element => {
      params = params.append('categoryId', element);
    });

    request.priorityId.forEach(element => {
      params = params.append('priorityId', element);
    });
    
    request.statusId.forEach(element => {
      params = params.append('statusId', element);
    });

    return this.http.get<ticket[]>(this.baseUrl + 'ticket', {params} );
  }

  getMyTickets() {
    return this.http.get<ticket[]>(this.baseUrl + 'ticket/myticket');
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
