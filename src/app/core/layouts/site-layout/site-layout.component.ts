import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AccountService } from 'src/app/account/account.service';
import { LayoutServiceService } from '../../services/layout-service.service';
import { map } from 'rxjs';
import { CurrentUserService } from '../../services/current-user.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent implements OnInit  {
  
  @ViewChild('toggleButton') toggleButton!: ElementRef;

  pageTitle! : string;

  isMenuOpen = false;
  imagePath! : string | null;

  constructor(
    public accountService: AccountService,
    private renderer: Renderer2,
    private layoutService: LayoutServiceService,
    private currentUser : CurrentUserService
    ) {
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

    layoutService.currentPage$.subscribe(
      {
        next : res => {
          this.pageTitle = res!;
        }
      }
    )

    
  }
  ngOnInit(): void {
    var user = this.currentUser.getUser();
    if(user){
      this.imagePath = "https://localhost:7047/api/User/image/" + user?.imagePath;
    }
  }

  showUserInfo(){
    this.isMenuOpen= !this.isMenuOpen;
  }
}
