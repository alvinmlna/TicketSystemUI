import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { Product } from '../shared/shared/models/product';
import { City } from '../shared/shared/models/city';
import { TicketService } from './ticket.service';
import { Category, Priority, Product2, Status, User, ticket } from '../shared/shared/models/ticket';
import { ComponentService } from '../shared/shared/components/component.service';
import { ListTicketRequest } from '../shared/shared/models/request/listticketrequest';
import { statussummary } from '../shared/shared/models/responses/statussummary';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
  providers: [MessageService]
})
export class TicketComponent implements OnInit {

  statusSummary : string[] = [];

  summary : string = '';
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

  tickets: ticket[] = [];
  selectedticket! : ticket;

  constructor(
    private messageService: MessageService, 
    private router: Router,
    private componentService : ComponentService,
    private ticketService : TicketService
    ) {}

  ngOnInit() {
      this.initializeMultiSelect();
      this.onFilterPressed();
      this.initializeStatusSummary();
  }

  clear(table: Table) {
      table.clear();
  }

   navigate(){
    this.router.navigateByUrl("/dashboard");
  }

  onRowSelect(event: any) {
    this.router.navigateByUrl("/ticket/" + event.data.ticketId);
    //this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: event.data.name });
  }

  onRowUnselect(event: any) {
      this.messageService.add({ severity: 'info', summary: 'Product Unselected', detail: event.data.name });
  }

  onFilterPressed(){
    var value : ListTicketRequest = {
      summary: this.summary,
      productId : this.selectedproducts,
      categoryId : this.selectedcategories,
      priorityId : this.selectedpriorities,
      statusId : this.selectedstatuses,
      raisedBy : this.selectedraisedBy
     };

     this.ticketService.getTickets(value).subscribe({
      next : response => {
        console.log(response);
        this.tickets = response;
      }
     });
  }

  resetSelection() {
    this.summary = '';
    this.selectedproducts = [];
    this.selectedcategories = [];
    this.selectedpriorities = [];
    this.selectedstatuses = [];
    this.selectedraisedBy = [];
    this.onFilterPressed();
  }

  initializeStatusSummary(){
    this.ticketService.getStatusSummary().subscribe({
      next: response => {
        this.statusSummary = response.map(x => {
          return x.status + ' ' + x.count;
        })
      }
    })
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
