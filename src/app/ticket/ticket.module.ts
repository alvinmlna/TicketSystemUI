import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketComponent } from './ticket.component';
import { MySharedModule } from '../shared/shared/MySharedModule.module';
import { TicketRoutingModule } from './ticket-routing.module';
import { TicketAddComponent } from './ticket-add/ticket-add.component';
import { TicketEditComponent } from './ticket-edit/ticket-edit.component';

@NgModule({
  declarations: [
    TicketComponent,
    TicketAddComponent,
    TicketEditComponent
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
