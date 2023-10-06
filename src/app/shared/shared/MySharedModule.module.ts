import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Badge, BadgeModule } from 'primeng/badge';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { EditorModule } from 'primeng/editor';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { ChartModule } from 'primeng/chart';
import { MessagesModule } from 'primeng/messages';
import { ProductdropdownComponent } from './components/productdropdown/productdropdown.component';

@NgModule({
  declarations: [
    ProductdropdownComponent
  ],
  imports: [
    CommonModule,
    DropdownModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    ModalModule.forRoot(),
    ButtonModule,
    BadgeModule,
    TableModule,
    CardModule,
    EditorModule,
    FileUploadModule,
    ToastModule,
    ChartModule,
    MessagesModule
  ],
  exports: [
    DropdownModule,
    InputTextModule,
    ModalModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    BadgeModule,
    TableModule,
    CardModule,
    EditorModule,
    FileUploadModule,
    ToastModule,
    ChartModule,
    MessagesModule,
    ProductdropdownComponent
  ]
})
export class MySharedModule { }
