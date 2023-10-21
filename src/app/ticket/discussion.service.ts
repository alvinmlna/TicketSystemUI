import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { discussion } from '../shared/shared/models/discussion';

@Injectable({
  providedIn: 'root'
})
export class DiscussionService {
  baseUrl = "https://localhost:7047/api/";

  constructor(private http : HttpClient) { }

  addDiscussion(discussion : discussion){
    return this.http.post<discussion>(this.baseUrl + "discussion", discussion);
  }

  editDiscussion(discussion : discussion){
    return this.http.put<discussion>(this.baseUrl + "discussion", discussion);
  }

  getDiscussionByTicketId(ticketId : number) {
    return this.http.get<discussion[]>(this.baseUrl + "discussion/ticket/" + ticketId);
  }
}
