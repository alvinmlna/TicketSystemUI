import { Component, OnInit } from '@angular/core';
import Utils from '../../Helpers/utils';
import { CurrentUserService } from 'src/app/core/services/current-user.service';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss']
})
export class UnauthorizedComponent implements OnInit {
  homePageUrl!: string;

  constructor(private currentUser: CurrentUserService){}

  ngOnInit(): void {
    var user = this.currentUser.getUser();
    if(user){
      this.homePageUrl = Utils.userHomePage(user.roleId);
    } else [
      this.homePageUrl = "account/login"
    ]
  }
}
