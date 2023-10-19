import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './core/sidebar/sidebar.component';
import { MySharedModule } from './shared/shared/MySharedModule.module';
import { HttpClientModule } from '@angular/common/http';
import { SiteLayoutComponent } from './core/layouts/site-layout/site-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    SiteLayoutComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MySharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
