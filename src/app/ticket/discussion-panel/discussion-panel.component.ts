import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DiscussionService } from '../discussion.service';
import { discussion } from 'src/app/shared/shared/models/discussion';
import { MessageService } from 'primeng/api';
import { CurrentUserService } from 'src/app/core/services/current-user.service';
import { TicketService } from '../ticket.service';
import Utils from 'src/app/shared/shared/Helpers/utils';

@Component({
  selector: 'app-discussion-panel',
  templateUrl: './discussion-panel.component.html',
  styleUrls: ['./discussion-panel.component.scss'],
  providers: [MessageService]
})
export class DiscussionPanelComponent implements OnInit {
  @Input() ticketId! : number;
  @Input() activateReply = false;
  discussions! : discussion[];
  message!: string;
  currentUserId! : number;
  uploadedFiles: any[] = [];


  @Output("callReply") callReply: EventEmitter<any> = new EventEmitter();
  
  constructor(
    private discussionService: DiscussionService,
    private messageService: MessageService,
    private currentUserService: CurrentUserService,
    private ticketService: TicketService
    ){}
  
  ngOnInit(): void {
    this.loadDiscussion();

    var currentUser = this.currentUserService.getUser();
    if(currentUser){
      this.currentUserId = currentUser.userId!;
    }
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

  
  onChange(event:any) {
    this.uploadedFiles = [];
    if (event.target.files.length > 0) {
      for(let file of event.target.files) {
        this.uploadedFiles.push(file);
      }
    }
  } 

  downloadFile(filename : string){
    this.ticketService.downloadFile(filename).subscribe(
      response => {
        let filename = response.headers.get('content-disposition')?.split(';')[1].split('=')[1];
        let blob:Blob = response.body as Blob;
        let a = document.createElement('a');
        a.download = filename!;
        a.href = window.URL.createObjectURL(blob);
        a.click();
      }
    )
  }

  formatBytes(bytes : number) {
    return Utils.formatBytes(bytes);
  }

  submitMessage(){
    const myMessage : discussion = {
      ticketId : this.ticketId,
      userId : this.currentUserId,
      message : this.message,
      discussionId : null,
      dateSending : null,
      name : null,
      attachments : this.uploadedFiles,
      attachmentViews : null
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

  callActivatedReply(){
    this.callReply.emit();
  }
}
