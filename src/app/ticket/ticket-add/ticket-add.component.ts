import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
interface City {
  name: string;
  code: string;
}
interface UploadEvent {
  originalEvent: Event;
  files: File[];
}
export interface Product {
  id?: string;
  code?: string;
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  inventoryStatus?: string;
  category?: string;
  image?: string;
  rating?: number;
}
@Component({
  selector: 'app-ticket-add',
  templateUrl: './ticket-add.component.html',
  styleUrls: ['./ticket-add.component.scss'],
  providers: [MessageService]
})
export class TicketAddComponent {
  cities: City[] = [];

  products!: Product[];

  selectedCity: City | undefined;
  uploadedFiles: any[] = [];

  constructor(private messageService: MessageService) {}

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
