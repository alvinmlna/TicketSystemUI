import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { Product } from '../shared/shared/models/product';
import { City } from '../shared/shared/models/city';
import { TicketService } from './ticket.service';
import { Category, Priority, Product2, Status, User } from '../shared/shared/models/ticket';
import { ComponentService } from '../shared/shared/components/component.service';
import { ListTicketRequest } from '../shared/shared/models/request/listticketrequest';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
  providers: [MessageService]
})
export class TicketComponent implements OnInit {
  cities: City[] = [];

  products: Product2[] = [];
  categories: Category[] = [];
  priorities: Priority[] = [];
  statuses: Status[] = [];
  raisedBy: User[] = [];

  selectedproducts: number[] = [];
  selectedcategories: number[] = [];
  selectedpriorities: number[] = [];
  selectedstatuses: number[] = [];
  selectedraisedBy: number[] = [];

  productTable: Product2[] = [];
  selectedProductTable! : Product2;

  constructor(
    private messageService: MessageService, 
    private router: Router,
    private componentService : ComponentService,
    private ticketService : TicketService
    ) {}

  ngOnInit() {
      this.initializeMultiSelect();

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

  onFilterPressed(){
    var value : ListTicketRequest = {
      summary: '',
      productId : this.selectedproducts,
      categoryId : this.selectedcategories,
      priorityId : this.selectedpriorities,
      statusId : this.selectedstatuses,
      raisedBy : this.selectedraisedBy
     };

     this.ticketService.getTickets(value).subscribe({
      next : response => {
        console.log(response);
      }
     });
  }

  initializeMultiSelect() {
    this.componentService.getProducts().subscribe
    ({
      next : response => {
          this.products  = response;
      }
    });

    this.componentService.getCategory().subscribe({
      next : response => {
          this.categories  = response;
      }
    });

    this.componentService.getPriority().subscribe({
      next : response => {
          this.priorities  = response;
      }
    });

    this.componentService.getStatus().subscribe({
      next : response => {
          this.statuses  = response;
      }
    });

    this.componentService.getUsers().subscribe({
      next : response => {
          this.raisedBy = response;
      }
    });
  }
}
