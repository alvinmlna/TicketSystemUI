import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { UrgentTicketsComponent } from './urgent-tickets/urgent-tickets.component';
import { MySharedModule } from '../shared/shared/MySharedModule.module';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [
    DashboardComponent,
    UrgentTicketsComponent
  ],
  imports: [
    CommonModule,
    MySharedModule
  ],
  exports: [
    DashboardComponent,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
