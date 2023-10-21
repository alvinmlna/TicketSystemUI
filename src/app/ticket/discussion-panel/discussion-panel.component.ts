import { Component, Input, OnInit } from '@angular/core';
import { DiscussionService } from '../discussion.service';
import { discussion } from 'src/app/shared/shared/models/discussion';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-discussion-panel',
  templateUrl: './discussion-panel.component.html',
  styleUrls: ['./discussion-panel.component.scss'],
  providers: [MessageService]
})
export class DiscussionPanelComponent implements OnInit {
  @Input() ticketId! : number;
  discussions! : discussion[];
  message!: string;

  constructor(
    private discussionService: DiscussionService,
    private messageService: MessageService
    ){}
  
  ngOnInit(): void {
    this.loadDiscussion();
  }

  loadDiscussion() {
    this.discussionService.getDiscussionByTicketId(this.ticketId).subscribe(
      {
        next : res => 
        {
          this.discussions = res;  
        }
      }
    )
  }

  submitMessage(){
    const myMessage : discussion = {
      ticketId : this.ticketId,
      userId : 1,
      message : this.message,
      discussionId : null,
      dateSending : null
    };
    this.message = '';
    this.discussionService.addDiscussion(myMessage).subscribe({
      next: res => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Submitted!' });
        this.loadDiscussion();
      },
      error : err => {
        console.log(err)
      }
    })
  }
}
