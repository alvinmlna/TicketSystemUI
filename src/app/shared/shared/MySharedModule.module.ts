import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule,
    ModalModule.forRoot()
  ],
  exports: [
    DropdownModule,
    ModalModule,
    FormsModule
  ]
})
export class MySharedModule { }
