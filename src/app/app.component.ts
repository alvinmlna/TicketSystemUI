import { Component, OnInit, TemplateRef} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'
import { AccountService } from './account/account.service';
import { CurrentUserService } from './core/services/current-user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'TicketSystemUI';

  modalRef?: BsModalRef;

  constructor(
    private modalService: BsModalService, 
    private accountService: AccountService,
    private currentUserService: CurrentUserService
    ){}

  ngOnInit(): void {
    this.loadCurrentUser();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  
  loadCurrentUser(){
    const user = this.currentUserService.getUser();
    if(user){
      this.accountService.loadCurrentUser(user.token).subscribe();
    }
  }
}
