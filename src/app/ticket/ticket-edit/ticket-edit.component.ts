import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { TicketService } from '../ticket.service';
import { AttachmentView, ticket } from 'src/app/shared/shared/models/ticket';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { editticketrequest } from 'src/app/shared/shared/models/editticketrequest';
import { LayoutServiceService } from 'src/app/core/services/layout-service.service';
import Utils from 'src/app/shared/shared/Helpers/utils';

@Component({
  selector: 'app-ticket-edit',
  templateUrl: './ticket-edit.component.html',
  styleUrls: ['./ticket-edit.component.scss'],
  providers: [MessageService]
})
export class TicketEditComponent implements OnInit {
  IdOfItems!: number | null;
  IdOfItemsView!: string | null;
  ticket!: ticket;
  ticketFound!: boolean;
  attachments! : AttachmentView[];
  ticketNotFoundMessage: Message[] = [{ severity: 'error', summary: 'ERROR', detail: 'Ticket Not Found' }] ;

  //UI
  isTicketExist : boolean;
  activateReply = false;
  @ViewChild('editcontent', { static: false, read: ElementRef }) editContentElement!: ElementRef;

  //conditions
  isOverdue = false;
  isStatusClose = false;

  public ticketForm = this.fb.group({
    ticketInfoForm: this.fb.group({
      ticketId : new FormControl<number>(0, {nonNullable: true}),
      ticketIdView : new FormControl<string>(''),
      summary : new FormControl<string>({value: '',disabled: true}),
      description : new FormControl<string>({value: '',disabled: true}),
      assignedTo : [''],
      userId : new FormControl<number>(0, {nonNullable: true}),
      raisedDate : new FormControl<string>({value: '',disabled: true}),
      expectedDate : new FormControl<string>({value: '',disabled: true}),
      assignedToId : new FormControl<number>(0, {nonNullable: true}),
      raisedBy : new FormControl<string>({value: '',disabled: true}),
      productId : new FormControl<number>(0, {nonNullable: true}),
      categoryId : new FormControl<number>(0, {nonNullable: true}),
      priorityId : new FormControl<number>(0, {nonNullable: true}),
      statusId : new FormControl<number>(0, {nonNullable: true}),
    }),
  })
  uploadedFiles: any[] = [];


  constructor(
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private ticketService: TicketService,
    private fb : FormBuilder,
    private layoutService : LayoutServiceService
    ) {
      this.isTicketExist = true;
    }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    const status = this.activatedRoute.snapshot.paramMap;
    console.log(status);
    if(id) {
      this.getTicketById(id);
    }  else {
      this.isTicketExist = false;
    }
  }

  getTicketById(id : string) {
    this.ticketService.getTicketById(+id).subscribe({
      next: response => {
        if(!response){
          //result not exist
          this.ticketNotFound()
        }
        this.IdOfItems = response.ticketId;
        this.IdOfItemsView = response.ticketIdView;
        this.attachments = response.attachmentViews;
        this.layoutService.loadPageTitle("Ticket ID: " + this.IdOfItemsView);

        this.ticketForm.get('ticketInfoForm')?.patchValue(response);
        this.ticketForm.get('ticketInfoForm')?.get('raisedDate')?.setValue(formatDate(response.raisedDate, 'dd MMMM yyyy HH:mm a', 'en'));
        
        var today = new Date();
        var expectedDate = new Date();
        var expectedDateString = this.ticketForm.get('ticketInfoForm')?.get('expectedDate')?.value;

        if(expectedDateString){
          var expectedDate = new Date(expectedDateString);
          if(expectedDate < today) {
            this.isOverdue = true;
          }
        }
        
        var statusId = this.ticketForm.get('ticketInfoForm')?.get('statusId')?.value;
        if(statusId && statusId === 2) {
          this.isStatusClose = true;
        }

        this.ticketForm.get('ticketInfoForm')?.get('expectedDate')?.setValue(formatDate(response.expectedDate, 'dd MMMM yyyy HH:mm a', 'en'));
      },
      error: error => this.ticketNotFound()
    })
  }

  onSubmit(){
    let ticket : editticketrequest = {
      assignedToId : this.ticketForm.value.ticketInfoForm?.assignedToId as number,
      categoryId: this.ticketForm.value.ticketInfoForm?.categoryId as number,
      priorityId : this.ticketForm.value.ticketInfoForm?.priorityId as number,
      productId : this.ticketForm.value.ticketInfoForm?.productId as number,
      statusId : this.ticketForm.value.ticketInfoForm?.statusId as number,
      ticketId : this.ticketForm.value.ticketInfoForm?.ticketId as number,
    };

    this.ticketService.editTicket(ticket).subscribe((res) => {
      this.messageService.add({ key: 'bc', severity: 'success', summary: 'SUCCESS', detail: 'Action Successfull!' });
    },
    err => {
      this.messageService.add({ key: 'bc', severity: 'error', summary: 'ERROR', detail: 'Action Failed!' });
    }
    );
  }

  ticketNotFound() {
    this.isTicketExist = false;
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
  
  closeTicket(){
    this.ticketForm.get('ticketInfoForm')?.get('statusId')?.setValue(2);
    this.onSubmit();
  }

  activatedReply(){
    this.activateReply = true;
    setTimeout(() => {
      const element = document.getElementById('editcontent');
      if(element) {
        element.scrollTop = element.scrollHeight;
      }
    },200);
  }
}
