import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/shared/shared/models/responses/user';
import { UserService } from '../user.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  providers: [MessageService]
})
export class UserListComponent implements OnInit {

  users! : user[];
  
  constructor (private userService: UserService,
    private messageService: MessageService
    ){}

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser() {
    this.userService.getAll().subscribe({
      next: res => {
        this.users = res;
      }
    })
  }

  deleteUser(id : number) {
    this.userService.deleteUser(id).subscribe({
      next : res => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Ticket submitted successfully' });
        this.getAllUser();
      } ,
        error : err => {
          this.messageService.add({ severity: 'error', summary: 'ERROR', detail: 'Action Failed!' });
        }
    });
  }
}
