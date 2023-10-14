import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UploadEvent } from 'src/app/shared/shared/models/UploadEvent';
import { City } from 'src/app/shared/shared/models/city';
import { Product } from 'src/app/shared/shared/models/product';
import { TicketService } from '../ticket.service';
import { addticketrequest } from 'src/app/shared/shared/models/request/addticketrequest';
import { tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { AttachmentView } from 'src/app/shared/shared/models/ticket';


@Component({
  selector: 'app-ticket-add',
  templateUrl: './ticket-add.component.html',
  styleUrls: ['./ticket-add.component.scss'],
  providers: [MessageService]
})
export class TicketAddComponent {
  cities: City[] = [];

  ticketid! : number;
  IdOfticketView!: string | null;

  products!: Product[];
  selectedCity: City | undefined;
  uploadedFiles: any[] = [];

  
  attachments! : AttachmentView[];
  progress!: number;
  @ViewChild('fileUpload') fileUpload: any;

  /////////////

  ticketForm = this.fb.group({
    ticketInfoForm: this.fb.group({
      userId : new FormControl<number>(1, {nonNullable: true}),
      raisedBy : new FormControl<string>({value: 'Alvin Maulana',disabled: true}),
      productId : new FormControl<number>(0, {nonNullable: true}),
      categoryId : new FormControl<number>(0, {nonNullable: true}),
      priorityId : new FormControl<number>(0, {nonNullable: true}),
      summary : new FormControl<string>({value: '',disabled: false}),
      description : new FormControl<string>({value: '',disabled: false})
    }),
  })

  constructor(private messageService: MessageService,
    private fb : FormBuilder,
    private ticketService : TicketService,
    private route : Router
    ) {}

  uploadfun(event: UploadEvent) {
    console.log(event);
  }

  refreshAttachmentView(){
    if(this.ticketid){
      this.ticketService.getTicketById(+this.ticketid).subscribe({
        next: response => {
          this.attachments = response.attachmentViews;
        }
      })
    }
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
    
      this.ticketService.uploadFileById(formData, this.ticketid).subscribe({
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

  onSubmit(){
    if(this.ticketForm.valid) {
      let ticket : addticketrequest = {
        userId : this.ticketForm.value.ticketInfoForm?.userId as number,
        productId : this.ticketForm.value.ticketInfoForm?.productId as number,
        categoryId: this.ticketForm.value.ticketInfoForm?.categoryId as number,
        priorityId : this.ticketForm.value.ticketInfoForm?.priorityId as number,
        summary :  this.ticketForm.value.ticketInfoForm?.summary as string,
        description :  this.ticketForm.value.ticketInfoForm?.description as string,
      };
      console.log(ticket);
        
      this.ticketService.addTicket(ticket).subscribe({
        next : res => {
          console.log(res);
          this.ticketid = res.ticketId;
          this.IdOfticketView = res.ticketIdView;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Ticket submitted successfully' });
        }
      }
      );
    } else {
      console.log("NOT VALID");
    }
    console.log(this.ticketForm.value);
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

  ngOnInit() {
      this.cities = [
          { name: 'New York', code: 'NY' },
          { name: 'Rome', code: 'RM' },
          { name: 'London', code: 'LDN' },
          { name: 'Istanbul', code: 'IST' },
          { name: 'Paris', code: 'PRS' }
      ];
  }
}
