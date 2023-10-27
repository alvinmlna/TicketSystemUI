import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketComponent } from './ticket.component';
import { MySharedModule } from '../shared/shared/MySharedModule.module';
import { TicketRoutingModule } from './ticket-routing.module';
import { TicketAddComponent } from './ticket-add/ticket-add.component';
import { TicketEditComponent } from './ticket-edit/ticket-edit.component';
import { DiscussionPanelComponent } from './discussion-panel/discussion-panel.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArchive, faCheckCircle, faReply } from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [
    TicketComponent,
    TicketAddComponent,
    TicketEditComponent,
    DiscussionPanelComponent
  ],
  imports: [
    CommonModule,
    MySharedModule,
    TicketRoutingModule,
    FontAwesomeModule,
  ], 
  exports: [
    TicketComponent,
    TicketRoutingModule
  ]
})
export class TicketModule { 
  constructor(library: FaIconLibrary){
    library.addIcons(
      faReply,
      faCheckCircle,
      faArchive
    )
  }
}
