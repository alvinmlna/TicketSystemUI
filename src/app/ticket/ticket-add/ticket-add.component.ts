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
import { AttachmentView } from 'src/app/shared/shared/models/ticket';
import { LayoutServiceService } from 'src/app/core/services/layout-service.service';


@Component({
  selector: 'app-ticket-add',
  templateUrl: './ticket-add.component.html',
  styleUrls: ['./ticket-add.component.scss'],
  providers: [MessageService]
})
export class TicketAddComponent {
  uploadedFiles: any[] = [];
  isRedirect = false;

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

    
  onChange(event:any) {
    this.uploadedFiles = [];
    if (event.target.files.length > 0) {
      for(let file of event.target.files) {
        this.uploadedFiles.push(file);
      }
    }
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
        
      this.ticketService.addTicket(ticket).subscribe({
        next : res => {
          console.log(res);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Ticket submitted successfully' });
          
          this.isRedirect = true;
            setTimeout(() => {
              this.route.navigateByUrl("/ticket/" + res.ticketId);
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
}