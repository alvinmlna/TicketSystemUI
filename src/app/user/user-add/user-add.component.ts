import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { userregisterrequest } from 'src/app/shared/shared/models/request/user-register-request';
import { UserService } from '../user.service';
import { MessageService } from 'primeng/api';
import { Route, Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { dropdownModel } from 'src/app/shared/shared/models/components/dropdownModel';
import RoleDataHelper from 'src/app/shared/shared/Helpers/RoleDataHelper';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss'],
  providers: [MessageService]
})
export class UserAddComponent {
  @Output("refreshTable") refreshTable: EventEmitter<any> = new EventEmitter();
  @Input() bsModalRef! : BsModalRef;
  roleDropdownData!: dropdownModel[];

  userForm = this.fb.group({
    email : new FormControl<string>(''),
    name : [''],
    password : [''],
    roleId : [0]
  })

  constructor (private fb: FormBuilder, 
    private userService : UserService, 
    private messageService : MessageService
    ){
      this.roleDropdownData = RoleDataHelper.get()
    }
  
  onSubmit(){
    if(this.userForm.valid) {
      let user : userregisterrequest = {
        email : this.userForm.value.email!,
        name : this.userForm.value.name!,
        password : this.userForm.value.password!,
        roleId : this.userForm.value.roleId!,
      };
      this.userService.addUser(user).subscribe({
        next : res => {
          this.refreshTable.emit();
          this.bsModalRef.hide();
        } ,
          error : err => {
            console.log(err);
            this.messageService.add({ severity: 'error', summary: 'ERROR', detail: 'Action Failed!' });
          }
      });
    } else {
      console.log("NOT VALID");
    }
  }


}
