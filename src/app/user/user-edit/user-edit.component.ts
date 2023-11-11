import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { userupdaterequest } from 'src/app/shared/shared/models/request/user-update-request';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
  providers: [MessageService]
})
export class UserEditComponent implements OnInit {
  @Output("refreshTable") refreshTable: EventEmitter<any> = new EventEmitter();
  @Input() bsModalRef! : BsModalRef;
  
  @Input() userId : any;
  userExist = false;

  userForm = this.fb.group({
    userId : [0],
    email : [''],
    name : [''],
    roleId : [0]
  })

  constructor(
    private fb : FormBuilder,
    private messageService : MessageService,
    private userService : UserService,
    private activatedRoute: ActivatedRoute,
    public router : Router,
    ){}


  ngOnInit(): void {
    if(this.userId) {
      this.getUserById(this.userId);
    }  
  }

  getUserById(id: string) {
    this.userService.getUserById(+id).subscribe({
      next: res => {
        this.userExist = true;
        this.userForm.patchValue(res);
      }
    })
  }

  onSubmit(){
    if(this.userForm.valid) {
      let user : userupdaterequest = {
        userId : this.userForm.value.userId!,
        email : this.userForm.value.email!,
        name : this.userForm.value.name!,
        roleId : this.userForm.value.roleId!,
      };
      this.userService.editUser(user).subscribe({
        next : res => {
          this.refreshTable.emit();
          this.bsModalRef.hide()
        } ,
          error : err => {
            this.messageService.add({ severity: 'error', summary: 'ERROR', detail: 'Action Failed!' });
          }
      });
    } else {
      console.log("NOT VALID");
    }
  }
}
