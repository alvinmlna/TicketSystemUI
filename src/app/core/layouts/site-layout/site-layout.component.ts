import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent  {
  
  @ViewChild('toggleButton') toggleButton!: ElementRef;

  isMenuOpen = true;

  constructor(
    public accountService: AccountService,
    private renderer: Renderer2) {
    /**
     * This events get called by all clicks on the page
     */
    this.renderer.listen('window', 'click',(e:Event)=>{
        if(e.target !== this.toggleButton.nativeElement ){
            let targetElement = e.target as Element;
            if (!targetElement.matches('.media-element')) { //if clicked element doesn't have class '.navi-start'
              this.isMenuOpen=false;
            }
        }
    });
  }

  showUserInfo(){
    this.isMenuOpen= !this.isMenuOpen;
  }
}
