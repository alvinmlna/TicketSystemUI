import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { Product } from '../shared/shared/models/product';
import { City } from '../shared/shared/models/city';
import { TicketService } from './ticket.service';
import { Product2 } from '../shared/shared/models/ticket';
import { ComponentService } from '../shared/shared/components/component.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
  providers: [MessageService]
})
export class TicketComponent implements OnInit {
  cities: City[] = [];

  products: Product2[] = [];

  //
  productTable: Product2[] = [];
  selectedProductTable! : Product2;

  constructor(
    private messageService: MessageService, 
    private router: Router,
    private componentService : ComponentService
    ) {}

  ngOnInit() {


      this.cities = [
          { name: 'New York', code: 'NY' },
          { name: 'Rome', code: 'RM' },
          { name: 'London', code: 'LDN' },
          { name: 'Istanbul', code: 'IST' },
          { name: 'Paris', code: 'PRS' }
      ];
  }

  clear(table: Table) {
      table.clear();
  }

   navigate(){
    this.router.navigateByUrl("/dashboard");
  }

  onRowSelect(event: any) {
    this.router.navigateByUrl("/ticket/" + event.data.code);
    //this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: event.data.name });
  }

  onRowUnselect(event: any) {
      this.messageService.add({ severity: 'info', summary: 'Product Unselected', detail: event.data.name });
  }

  initializeMultiSelect() {
    this.componentService.getProducts().subscribe
    ({
      next : response => {
          this.products  = response;
      }
    });
  }
}
