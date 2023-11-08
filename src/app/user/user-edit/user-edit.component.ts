import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { userupdaterequest } from 'src/app/shared/shared/models/request/user-update-request';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
  providers: [MessageService]
})
export class UserEditComponent implements OnInit {
  
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
    private activatedRoute: ActivatedRoute
    ){}


  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id) {
      this.getUserById(id);
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
          console.log(res);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Ticket submitted successfully' });
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
