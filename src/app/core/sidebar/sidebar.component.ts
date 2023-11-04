import { Component } from '@angular/core';
import { CurrentUserService } from '../services/current-user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  constructor(private currentUser: CurrentUserService){
  }

  enableSideBar(title : string){
    var user = this.currentUser.getUser();
    if(user) {
      if(user.roleId == "1")
      {
        return this.customerMenu(title);
      }
        else if (user.roleId == "2")
      {
        return this.adminMenu(title);
      }
    } 
    return false;
  }

  customerMenu(title : string) {
    var menu = ['ticket'];
    return menu.includes(title);
  }

  adminMenu(title : string) {
    var menu = ['ticket', 'dashboard'];
    return menu.includes(title);
  }

}
