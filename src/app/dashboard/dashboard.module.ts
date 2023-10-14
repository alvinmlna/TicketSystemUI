import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { UrgentTicketsComponent } from './urgent-tickets/urgent-tickets.component';
import { MySharedModule } from '../shared/shared/MySharedModule.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { StatuscounterComponent } from './statuscounter/statuscounter.component';
import { NumberofticketchartComponent } from './numberofticketchart/numberofticketchart.component';
import { CategorychartComponent } from './categorychart/categorychart.component';

@NgModule({
  declarations: [
    DashboardComponent,
    UrgentTicketsComponent,
    StatuscounterComponent,
    NumberofticketchartComponent,
    CategorychartComponent
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
