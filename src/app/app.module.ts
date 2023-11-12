import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './core/sidebar/sidebar.component';
import { MySharedModule } from './shared/shared/MySharedModule.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SiteLayoutComponent } from './core/layouts/site-layout/site-layout.component';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { PublicDashboardComponent } from './core/layouts/public-dashboard/public-dashboard.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHandsHelping, faTachometerAlt, faTicketAlt, faUserAlt, faUsers } from '@fortawesome/free-solid-svg-icons';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    SiteLayoutComponent,
    SidebarComponent,
    PublicDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MySharedModule,
    NgxSpinnerModule,
    FontAwesomeModule,
    TooltipModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(library: FaIconLibrary){
    library.addIcons(
      faTachometerAlt,
      faTicketAlt,
      faHandsHelping,
      faUsers
    )
  }

 }
