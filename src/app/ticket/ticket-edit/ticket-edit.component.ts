import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UploadEvent } from 'src/app/shared/shared/models/UploadEvent';
import { City } from 'src/app/shared/shared/models/city';
import { Product } from 'src/app/shared/shared/models/product';

@Component({
  selector: 'app-ticket-edit',
  templateUrl: './ticket-edit.component.html',
  styleUrls: ['./ticket-edit.component.scss'],
  providers: [MessageService]
})
export class TicketEditComponent implements OnInit {
  IdOfItems!: string | null;
  cities: City[] = [];

  products!: Product[];
  selectedCity: City | undefined;
  uploadedFiles: any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService
    ) {}

  ngOnInit(): void {
    this.IdOfItems = this.activatedRoute.snapshot.paramMap.get('id');
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
