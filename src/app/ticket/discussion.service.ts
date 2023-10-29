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
    const formData = new FormData();
    formData.append('userId', discussion.userId.toString());
    formData.append('message', discussion.message.toString());
    formData.append('ticketId', discussion.ticketId.toString());

    if(discussion.attachments){
      discussion.attachments.forEach((file) => { formData.append('attachments', file); });
    }

    return this.http.post<discussion>(this.baseUrl + "discussion", formData);
  }

  editDiscussion(discussion : discussion){
    return this.http.put<discussion>(this.baseUrl + "discussion", discussion);
  }

  getDiscussionByTicketId(ticketId : number) {
    return this.http.get<discussion[]>(this.baseUrl + "discussion/ticket/" + ticketId);
  }
}
