import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UploadEvent } from 'src/app/shared/shared/models/UploadEvent';
import { City } from 'src/app/shared/shared/models/city';
import { Product } from 'src/app/shared/shared/models/product';
import { TicketService } from '../ticket.service';
import { ticket } from 'src/app/shared/shared/models/ticket';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-ticket-edit',
  templateUrl: './ticket-edit.component.html',
  styleUrls: ['./ticket-edit.component.scss'],
  providers: [MessageService]
})
export class TicketEditComponent implements OnInit {

  IdOfItems!: string | null;
  ticket!: ticket;

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
    attachmentForm: this.fb.group({
      attachment: ['']
    })
  })

  onSubmit(){
    console.log(this.ticketForm.value);
  }

  cities: City[] = [];

  products!: Product[];
  selectedCity: City | undefined;
  uploadedFiles: any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private ticketService: TicketService,
    private fb : FormBuilder
    ) {}

  ngOnInit(): void {
    this.IdOfItems = this.activatedRoute.snapshot.paramMap.get('id');

    if(this.IdOfItems) {
      this.ticketService.getTicketById(+this.IdOfItems).subscribe({
        next: response => {
          this.ticket = response;
          this.ticketForm.get('ticketInfoForm')?.patchValue(response);
          this.ticketForm.get('ticketInfoForm')?.get('raisedDate')?.setValue(formatDate(response.raisedDate, 'yyyy-MM-dd', 'en'));
        }
      })
    }


    this.cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];
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

}
