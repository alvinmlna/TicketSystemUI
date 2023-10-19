import { Component } from '@angular/core';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent {
  
  constructor(public accountService: AccountService){}

}
