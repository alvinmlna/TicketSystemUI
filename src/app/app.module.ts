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
    MySharedModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
