import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent implements AfterViewInit {
  
  constructor(public accountService: AccountService, private elementRef:ElementRef){}

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.querySelector('my-element')
                                .addEventListener('click', this.showUserInfo.bind(this))
  }


  showUserInfo(){
    const element = <HTMLElement> document.getElementById('myDropdown');
    element.classList.toggle("show");
  }
}
