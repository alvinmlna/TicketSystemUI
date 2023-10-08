import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { UploadEvent } from 'src/app/shared/shared/models/UploadEvent';
import { TicketService } from '../ticket.service';
import { AttachmentView, ticket } from 'src/app/shared/shared/models/ticket';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { editticketrequest } from 'src/app/shared/shared/models/editticketrequest';

@Component({
  selector: 'app-ticket-edit',
  templateUrl: './ticket-edit.component.html',
  styleUrls: ['./ticket-edit.component.scss'],
  providers: [MessageService]
})
export class TicketEditComponent implements OnInit {
  isTicketExist : boolean;
  IdOfItems!: string | null;
  ticket!: ticket;
  ticketFound!: boolean;
  attachments! : AttachmentView[];
  ticketNotFoundMessage!: Message[] ;

  //UI
  submitAlertMessage!: Message[];

  ticketForm = this.fb.group({
    ticketInfoForm: this.fb.group({
      ticketId : new FormControl<number>(0, {nonNullable: true}),
      ticketIdView : new FormControl<string>(''),
      summary : new FormControl<string>(''),
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
    this.showAlert(0);

    this.ticketNotFoundMessage = [{ severity: 'error', summary: 'ERROR', detail: 'Ticket Not Found' }];
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
        this.IdOfItems = response.ticketIdView;
        this.attachments = response.attachmentViews;

        this.ticketForm.get('ticketInfoForm')?.patchValue(response);
        this.ticketForm.get('ticketInfoForm')?.get('raisedDate')?.setValue(formatDate(response.raisedDate, 'dd MMMM yyyy HH:mm a', 'en'));
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
      this.showAlert(1);
    });
  }

  ticketNotFound() {
    this.isTicketExist = false;
  }

  uploadfun(event: UploadEvent) {
    console.log(event);
  }

  onUpload(event: UploadEvent) {
    for(let file of event.files) {
        this.uploadedFiles.push(file);
    }

      this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
  }

  dealWithFiles(event: UploadEvent) {
    for(let file of event.files) {
        this.uploadedFiles.push(file);
        console.log(this.uploadedFiles);
    }
      // Deal with your files
      // e.g  assign it to a variable, and on submit add the variable to your form data
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

  editTicket(){
    try {
      // const _ticket = this.getTickettoEdit();
      // const resullt = firstValueFrom(this.ticketService.addTicket(_ticket))

    } catch (error : any) {
      console.log(error);
    } finally {
    }
  }

  // getTickettoEdit() : ticket {
  //   return new this.ticket()
  // }


  showAlert(type : number){
    switch (type) {
      case 1: {
        this.submitAlertMessage = [{ severity: 'success', summary: 'Success', detail: 'Ticket updated successfully!' }];
        break; 
      }
      case 2: {
        this.submitAlertMessage = [{ severity: 'error', summary: 'Failed!', detail: 'Update ticket Failed!' }];
        break; 
      }
      default : {
        this.submitAlertMessage = [];
      }

    }
  }
}
