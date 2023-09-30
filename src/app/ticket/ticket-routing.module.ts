import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketComponent } from './ticket.component';
import { TicketAddComponent } from './ticket-add/ticket-add.component';

const routes: Routes = [
  {path: '', component: TicketComponent},
  {path: 'add', component: TicketAddComponent},
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class TicketRoutingModule { }
