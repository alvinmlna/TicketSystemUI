import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { UploadEvent } from 'src/app/shared/shared/models/UploadEvent';
import { TicketService } from '../ticket.service';
import { AttachmentView, ticket } from 'src/app/shared/shared/models/ticket';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { editticketrequest } from 'src/app/shared/shared/models/editticketrequest';
import { HttpClient, HttpEventType, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-ticket-edit',
  templateUrl: './ticket-edit.component.html',
  styleUrls: ['./ticket-edit.component.scss'],
  providers: [MessageService]
})
export class TicketEditComponent implements OnInit {
  isTicketExist : boolean;
  IdOfItems!: number | null;
  IdOfItemsView!: string | null;
  ticket!: ticket;
  ticketFound!: boolean;
  attachments! : AttachmentView[];
  ticketNotFoundMessage: Message[] = [{ severity: 'error', summary: 'ERROR', detail: 'Ticket Not Found' }] ;

  //UI
  submitAlertMessage!: Message[];
  progress!: number;
  @ViewChild('fileUpload') fileUpload: any;

  ticketForm = this.fb.group({
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
    private fb : FormBuilder
    ) {
      this.isTicketExist = true;
    }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id) {
      this.getTicketById(id);
    }  else {
      this.isTicketExist = false;
    }
  }

  getTicketById(id : string) {
    this.ticketService.getTicketById(+id).subscribe({
      next: response => {
        console.log(response);
        if(!response){
          //result not exist
          this.ticketNotFound()
        }
        this.IdOfItems = response.ticketId;
        this.IdOfItemsView = response.ticketIdView;
        this.attachments = response.attachmentViews;

        this.ticketForm.get('ticketInfoForm')?.patchValue(response);
        this.ticketForm.get('ticketInfoForm')?.get('raisedDate')?.setValue(formatDate(response.raisedDate, 'dd MMMM yyyy HH:mm a', 'en'));
      },
      error: error => this.ticketNotFound()
    })
  }

  refreshAttachmentView(){
    if(this.IdOfItems){
      this.ticketService.getTicketById(+this.IdOfItems).subscribe({
        next: response => {
          this.attachments = response.attachmentViews;
        }
      })
    }
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

  uploadfun(event: UploadEvent) {
    console.log(event);
  }

  onUpload(_uploadEvent: UploadEvent) {
    for(let file of _uploadEvent.files) {
        this.uploadedFiles.push(file);
    }

    if (this.uploadedFiles.length === 0) {
      this.messageService.add({ severity: 'error', summary: 'ERROR', detail: 'No file to upload!' });
      return;
    }

    const formData = new FormData();
    this.uploadedFiles.forEach((file) => { formData.append('files[]', file); });
    
      this.ticketService.uploadFileById(formData, this.IdOfItems).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.UploadProgress)
        {
          this.progress = Math.round(100 * event.loaded / event.total!);
          console.log(this.progress);
        }
        else if (event.type === HttpEventType.Response) {
          this.uploadedFiles = [];
          this.fileUpload.clear();
          this.progress = 0;
          this.refreshAttachmentView();
          this.messageService.add({ key: 'bc', severity: 'success', summary: 'SUCCESS', detail: 'Upload Success!' });
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this.uploadedFiles = [];
        this.fileUpload.clear();
        this.progress = 0;
        this.messageService.add({ key: 'bc', severity: 'error', summary: 'ERROR', detail: 'Action Failed!' });
      }
    });


  }

  dealWithFiles(event: UploadEvent) {
    // for(let file of event.files) {
    //     this.uploadedFiles.push(file);
    //     console.log(this.uploadedFiles);
    // }
    //   // Deal with your files
    //   // e.g  assign it to a variable, and on submit add the variable to your form data
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
}
