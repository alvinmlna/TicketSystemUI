import { Component, OnInit, TemplateRef } from '@angular/core';
import { user } from 'src/app/shared/shared/models/responses/user';
import { UserService } from '../user.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { UserAddComponent } from '../user-add/user-add.component';
import { UserEditComponent } from '../user-edit/user-edit.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  providers: [MessageService]
})
export class UserListComponent implements OnInit {

  bsAddModalRef!: BsModalRef;
  bsEditModalRef!: BsModalRef;
  
  userId : any;
  users! : user[];
  selectedUser! : user;

  search = "";
  
  constructor (private userService: UserService,
    private messageService: MessageService,
    private router : Router,
    private modalService: BsModalService
    ){}

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser() {
    this.userService.getAll(this.search).subscribe({
      next: res => {
        this.users = res;
      }
    })
  }

  CompleteSaving(successMessage : string){
    this.messageService.add({ severity: 'success', summary: 'Success', detail: successMessage });
    this.getAllUser();
  }

  deleteUser(id : number) {
    if(confirm("Are you sure to remove this user?")) {
      this.userService.deleteUser(id).subscribe({
        next : res => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User removed successfully' });
          this.getAllUser();
        } ,
          error : err => {
            console.log(err);
            this.messageService.add({ severity: 'error', summary: 'ERROR', detail: 'Action Failed!' });
          }
      });
    }
  }

  onRowSelect(event: any, template: TemplateRef<any>) {
    this.userId = event.data.userId;
    this.bsEditModalRef = this.modalService.show(template);
  }

  addUser(event : any, template: TemplateRef<any>) {
    event.preventDefault();
    this.bsAddModalRef = this.modalService.show(template);
  }
}
