import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Product } from 'src/app/shared/shared/models/product';
import { ticket } from 'src/app/shared/shared/models/ticket';
import { TicketService } from 'src/app/ticket/ticket.service';

@Component({
  selector: 'app-urgent-tickets',
  templateUrl: './urgent-tickets.component.html',
  styleUrls: ['./urgent-tickets.component.scss'],
  providers: [MessageService]
})
export class UrgentTicketsComponent implements OnInit {
  
    tickets: ticket[] = [];
    selectedticket! : ticket;

  constructor(
    private messageService: MessageService, 
    private router: Router, 
    private ticketService: TicketService) 
    {}

  ngOnInit() {
    this.ticketService.getMyTickets().subscribe({
        next: res => {
            this.tickets = res;
        }
    })
  }

  onRowSelect(event: any) {
    this.router.navigateByUrl("/ticket/" + event.data.ticketId);
  }

}
