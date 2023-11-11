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
import { CategorydropdownComponent } from './components/categorydropdown/categorydropdown.component';
import { StatusdropdownComponent } from './components/statusdropdown/statusdropdown.component';
import { AssigneddropdownComponent } from './components/assigneddropdown/assigneddropdown.component';
import { PrioritydropdownComponent } from './components/prioritydropdown/prioritydropdown.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { TextInputComponent } from './components/text-input/text-input.component';
import { UnauthorizedComponent } from './common-pages/unauthorized/unauthorized.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';

@NgModule({
  declarations: [
    ProductdropdownComponent,
    CategorydropdownComponent,
    StatusdropdownComponent,
    AssigneddropdownComponent,
    PrioritydropdownComponent,
    TextInputComponent,
    UnauthorizedComponent,
    DropdownComponent
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
    MessagesModule,
    InputTextareaModule,
    MultiSelectModule
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
    InputTextareaModule,
    ProductdropdownComponent,
    CategorydropdownComponent,
    StatusdropdownComponent,
    AssigneddropdownComponent,
    PrioritydropdownComponent,
    DropdownComponent,
    TextInputComponent,
    MultiSelectModule
  ]
})
export class MySharedModule { }
