import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
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

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DropdownModule,
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
    ChartModule
  ],
  exports: [
    DropdownModule,
    InputTextModule,
    ModalModule,
    FormsModule,
    ButtonModule,
    BadgeModule,
    TableModule,
    CardModule,
    EditorModule,
    FileUploadModule,
    ToastModule,
    ChartModule
  ]
})
export class MySharedModule { }
