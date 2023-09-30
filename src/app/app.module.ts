import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './core/sidebar/sidebar.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoreModule } from './core/core/core.module';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TicketComponent } from './ticket/ticket.component';
import { SharedModule } from 'primeng/api';
import { MySharedModule } from './shared/shared/MySharedModule.module';
import { TicketModule } from './ticket/ticket.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    MySharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
