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
import { LayoutServiceService } from 'src/app/core/services/layout-service.service';
import { NgxSpinnerService } from 'ngx-spinner';


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

  isRedirect = false;

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
    private route : Router,
    private layoutService : LayoutServiceService,
    ) {
      this.layoutService.loadPageTitle("Create new ticket");
    }

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

  onSelect(_uploadEvent: any) {
    this.uploadedFiles = [];

    for(let file of _uploadEvent.currentFiles) {
      this.uploadedFiles.push(file);
    }
  }

  onClear(_event: any){
    this.uploadedFiles = [];
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
        attachments : this.uploadedFiles
      };
      console.log(ticket.attachments);
        
      this.ticketService.addTicket(ticket).subscribe({
        next : res => {
          console.log(res);
          this.ticketid = res.ticketId;
          this.IdOfticketView = res.ticketIdView;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Ticket submitted successfully' });
          
          this.isRedirect = true;
            setTimeout(() => {
              this.route.navigateByUrl("/ticket/" + this.ticketid);
            }, 2000);
          },
          error : err => {
            this.messageService.add({ severity: 'error', summary: 'ERROR', detail: 'Action Failed!' });
          }
      });
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
