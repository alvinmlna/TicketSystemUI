import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { userregisterrequest } from 'src/app/shared/shared/models/request/user-register-request';
import { UserService } from '../user.service';
import { MessageService } from 'primeng/api';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss'],
  providers: [MessageService]
})
export class UserAddComponent {

  userForm = this.fb.group({
    email : new FormControl<string>(''),
    name : [''],
    password : [''],
    roleId : [0]
  })

  constructor (private fb: FormBuilder, 
    private userService : UserService, 
    private messageService : MessageService,
    private route: Router
    
    ){}
  
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
          console.log(res);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Ticket submitted successfully' });
          
          this.route.navigateByUrl("/user");
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
