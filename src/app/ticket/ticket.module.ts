import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketComponent } from './ticket.component';
import { MySharedModule } from '../shared/shared/MySharedModule.module';
import { TicketRoutingModule } from './ticket-routing.module';

@NgModule({
  declarations: [
    TicketComponent
  ],
  imports: [
    CommonModule,
    MySharedModule,
    TicketRoutingModule,
  ], 
  exports: [
    TicketComponent,
    TicketRoutingModule
  ]
})
export class TicketModule { }
