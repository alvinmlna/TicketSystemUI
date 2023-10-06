import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product2, ticket } from '../shared/shared/models/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  baseUrl = "https://localhost:7047/api/";
  ticket : ticket | any;

  constructor(private http: HttpClient) { }

  getTicketById(id: number){
    return this.http.get<ticket>(this.baseUrl + 'ticket/' + id);
  }
}
