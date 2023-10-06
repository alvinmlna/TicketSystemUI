import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { UploadEvent } from 'src/app/shared/shared/models/UploadEvent';
import { City } from 'src/app/shared/shared/models/city';
import { Product } from 'src/app/shared/shared/models/product';
import { TicketService } from '../ticket.service';
import { AttachmentView, ticket } from 'src/app/shared/shared/models/ticket';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';
import { observable } from 'rxjs';

@Component({
  selector: 'app-ticket-edit',
  templateUrl: './ticket-edit.component.html',
  styleUrls: ['./ticket-edit.component.scss'],
  providers: [MessageService]
})
export class TicketEditComponent implements OnInit {

  IdOfItems!: string | null;
  ticket!: ticket;
  ticketFound!: boolean;
  attachments! : AttachmentView[];
  ticketNotFoundMessage!: Message[] ;

  ticketForm = this.fb.group({
    ticketInfoForm: this.fb.group({
      ticketId : new FormControl<number>(0, {nonNullable: true}),
      ticketIdView : new FormControl<string>(''),
      summary : new FormControl<string>({value: '',disabled: true}),
      description : new FormControl<string>({value: '',disabled: true}),
      assignedTo : [''],
      raisedDate : new FormControl<string>({value: '',disabled: true}),
      expectedDate : new FormControl<string>({value: '',disabled: true}),
      userId : new FormControl<number>(0, {nonNullable: true}),
      raisedBy : new FormControl<string>({value: '',disabled: true}),
      productId : new FormControl<number>(0, {nonNullable: true}),
      categoryId : new FormControl<number>(0, {nonNullable: true}),
      priorityId : new FormControl<number>(0, {nonNullable: true}),
      statusId : new FormControl<number>(0, {nonNullable: true}),
    }),
  })
  uploadedFiles: any[] = [];

  onSubmit(){
    console.log(this.ticketForm.value);
  }

  cities: City[] = [];

  products!: Product[];
  selectedCity: City | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private ticketService: TicketService,
    private fb : FormBuilder
    ) {}

  ngOnInit(): void {
    this.ticketNotFoundMessage = [{ severity: 'error', summary: 'ERROR', detail: 'Ticket Not Found' }];

    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if(id) {
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
          this.ticketForm.get('ticketInfoForm')?.get('raisedDate')?.setValue(formatDate(response.raisedDate, 'yyyy-MM-dd', 'en'));
        },
        error: error => this.ticketNotFound()
      }
      )
    } 


    this.cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];
  }

  ticketNotFound() {

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

}
